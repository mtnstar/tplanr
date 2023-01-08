import { Transformer, whitelist } from 'jsonapi-fractal';
import ItemListItem from '../../model/ItemListItem';

class ItemListItemTransformer extends Transformer<unknown, unknown> {
  constructor() {
    super();
    this.type = 'items';
  }

  transform(entry: ItemListItem) {
    const whiteListAttrs = ['id', 'itemId', 'optional', 'count'];
    return whitelist(entry, whiteListAttrs);
  }
}

export default ItemListItemTransformer;
