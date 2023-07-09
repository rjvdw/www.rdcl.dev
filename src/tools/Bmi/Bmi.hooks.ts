import { useEffect, useState } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { isValid, rounded } from '../../util/number'

export type BmiForm = {
  weight?: number
  height?: number
  bmi?: number
}

export type TargetBmiForm = {
  bmi?: number
}

export const useBmi = () => {
  const form = useForm<BmiForm>({
    defaultValues: {
      weight: initial('bmi:weight', 75),
      height: initial('bmi:height', 185),
    },
  })
  const [weight, height] = form.watch(['weight', 'height'])

  useEffect(() => {
    localStorage['bmi:weight'] = weight
    localStorage['bmi:height'] = height

    if (isValid(height) && isValid(weight)) {
      form.setValue('bmi', rounded(computeBmi(height, weight), 2))
    } else {
      form.setValue('bmi', undefined)
    }
  }, [form, weight, height])

  return {
    form,
    ...useTargetBmi(form),
  }
}

const useTargetBmi = (bmiForm: UseFormReturn<BmiForm>) => {
  const [targetBmiIsShown, setTargetBmiIsShown] = useState<boolean>(false)
  const { handleSubmit, register, setFocus, reset } = useForm<TargetBmiForm>()

  return {
    targetBmiIsShown: targetBmiIsShown,
    showTargetBmi() {
      setTargetBmiIsShown(true)

      // FIXME: This field does not exist at this point. This workaround makes the setFocus run after React has
      //        rendered the field. I am not sure how reliably this actually works.
      setTimeout(() => {
        setFocus('bmi')
      }, 1)
    },
    targetBmi: {
      onSubmit: handleSubmit(({ bmi: targetBmi }) => {
        const height = bmiForm.getValues('height')
        // FIXME: These two errors are not actually handled.
        if (!isValid(height)) {
          throw new Error('invalid height')
        }
        if (!isValid(targetBmi)) {
          throw new Error('invalid target bmi')
        }
        bmiForm.setValue(
          'weight',
          rounded(computeTargetWeight(height, targetBmi), 2),
        )
        setTargetBmiIsShown(false)
        reset()
      }),
      register: register('bmi', {
        valueAsNumber: true,
      }),
    },
  }
}

function initial(key: string, defaultValue: number): number {
  return key in localStorage ? Number(localStorage[key]) : defaultValue
}

function correctedHeight(height: number): number {
  return (height / 100) ** 2
}

export function computeBmi(height: number, weight: number): number {
  return weight / correctedHeight(height)
}

function computeTargetWeight(height: number, bmi: number): number {
  return bmi * correctedHeight(height)
}
