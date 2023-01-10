import { Transformer, whitelist } from 'jsonapi-fractal';
import { ItemList } from '../../model/ItemList';

class ItemListTransformer extends Transformer<unknown, unknown> {
  constructor() {
    super();
    this.type = 'item_lists';
  }

  transform(entry: ItemList) {
    const whiteListAttrs = ['id', 'templateLabel'];
    return whitelist(entry, whiteListAttrs);
  }
}

export default ItemListTransformer;
