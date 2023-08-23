import { FunctionComponent } from 'preact'
import { ActiveRoute } from '../../components/ActiveRoute'
import { PageTitle } from '../../components/PageTitle'
import { useFormId } from '../../util/form'
import { useCountdown } from './hooks'

export const Countdown: FunctionComponent = () => {
  const id = useFormId()
  const { computing, solution, error, onSubmit } = useCountdown()

  return (
    <>
      <ActiveRoute>countdown</ActiveRoute>
      <PageTitle>countdown</PageTitle>

      <h1>Countdown</h1>

      <form onSubmit={onSubmit} disabled={computing}>
        <section class="countdown-form-grid">
          <label for={id('numbers.0')}>Numbers:</label>
          <CDInput id={id('numbers.0')} name="numbers.0" />
          <CDInput id={id('numbers.1')} name="numbers.1" />
          <CDInput id={id('numbers.2')} name="numbers.2" />
          <CDInput id={id('numbers.3')} name="numbers.3" />
          <CDInput id={id('numbers.4')} name="numbers.4" />
          <CDInput id={id('numbers.5')} name="numbers.5" />

          <label for={id('target')}>Target:</label>
          <CDInput id={id('target')} name="target" min={1} max={999} />

          <button>Let&apos;s Play Countdown!</button>
        </section>
      </form>

      {error !== undefined && <p class="error">Solver failed: {error}</p>}

      {computing && <h2>Computing...</h2>}

      {!computing && solution && (
        <section data-testid="cd-solution">
          <h2>Solution</h2>
          <ul>
            {solution.map((line, key) => (
              <li key={key}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      {!computing && solution === null && (
        <>
          <section data-testid="cd-solution">
            <h2>Solution</h2>
            <p>This one is not possible</p>
          </section>
        </>
      )}
    </>
  )
}

type CDInputProps = {
  id: string
  name: string
  min?: number
  max?: number
}

const CDInput: FunctionComponent<CDInputProps> = ({
  id,
  name,
  min = 1,
  max = 100,
}) => (
  <input
    id={id}
    name={name}
    type="number"
    inputMode="numeric"
    min={min}
    max={max}
    required
  />
)
