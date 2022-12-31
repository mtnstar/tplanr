import { Transformer, whitelist } from 'jsonapi-fractal';
import TourItem from '../../model/TourItem';

class TourItemTransformer extends Transformer<unknown, unknown> {
  constructor() {
    super();
    this.type = 'items';
  }

  transform(entry: TourItem) {
    const whiteListAttrs = ['id', 'itemId', 'optional', 'count'];
    return whitelist(entry, whiteListAttrs);
  }
}

export default TourItemTransformer;
