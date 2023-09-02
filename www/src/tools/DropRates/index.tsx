import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../../components/ActiveRoute'
import { PageTitle } from '../../components/PageTitle'
import { useFormId } from '../../util/form'
import { useDropRates } from './hooks'

export const DropRates: FunctionComponent = () => {
  const id = useFormId()
  const { onChange, chance, perc95, perc99 } = useDropRates()

  return (
    <>
      <ActiveRoute>drop-rates</ActiveRoute>
      <PageTitle>drop rates</PageTitle>

      <h1>Drop Rates</h1>

      <form onChange={onChange}>
        <section class="form-grid" data-suffix={true}>
          <label data-start={1} for={id('drop-rate')}>
            Drop rate
          </label>
          <input
            id={id('drop-rate')}
            name="drop-rate"
            data-testid="drop-rate"
            type="number"
            inputMode="decimal"
            step="any"
            min={0}
            max={100}
          />
          <label for={id('drop-rate')}>%</label>

          <label data-start={1} for={id('nr-attempts')}>
            Nr. of attempts
          </label>
          <input
            id={id('nr-attempts')}
            name="nr-attempts"
            data-testid="nr-attempts"
            type="number"
            min={0}
          />

          <hr />

          <label data-start={1} for={id('chance')}>
            Chance
          </label>
          <input
            id={id('chance')}
            data-testid="chance"
            readOnly
            value={chance}
          />
          <label for={id('chance')}>%</label>

          <label data-start={1} for={id('perc95')}>
            95%
          </label>
          <input
            id={id('perc95')}
            data-testid="perc95"
            readOnly
            value={perc95}
          />

          <label data-start={1} for={id('perc99')}>
            99%
          </label>
          <input
            id={id('perc99')}
            data-testid="perc99"
            readOnly
            value={perc99}
          />
        </section>
      </form>
    </>
  )
}
