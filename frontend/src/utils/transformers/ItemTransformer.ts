import { Transformer, whitelist } from 'jsonapi-fractal';
import { Item } from '../../model/Item';

class ItemTransformer extends Transformer<unknown, unknown> {
  constructor() {
    super();
    this.type = 'items';
  }

  transform(entry: Item) {
    const whiteListAttrs = ['id', 'itemId', 'itemCategory', 'labelDe'];
    return whitelist(entry, whiteListAttrs);
  }
}

export default ItemTransformer;
