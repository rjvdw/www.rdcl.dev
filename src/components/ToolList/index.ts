import ToolList from './ToolList.astro'
import ToolListItem from './ToolListItem.astro'

export default Object.assign(ToolList, {
  Item: ToolListItem,
})
