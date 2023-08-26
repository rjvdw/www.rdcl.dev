import classNames from 'classnames'
import { FunctionComponent } from 'preact'

type SubNavListProps = {
  class?: string
}

export const SubNavListComponent: FunctionComponent<SubNavListProps> = ({
  children,
  class: className,
}) => <dl class={classNames('sub-nav-list', className)}>{children}</dl>

const Item: FunctionComponent<{ href: string; label: string }> = ({
  children,
  href,
  label,
  ...rest
}) => (
  <>
    <dt>
      <a href={href} {...rest}>
        {label}
      </a>
    </dt>
    <dd>{children}</dd>
  </>
)

export const SubNavList = Object.assign(SubNavListComponent, {
  Item,
})
