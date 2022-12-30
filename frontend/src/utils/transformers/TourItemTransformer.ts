import { Transformer, whitelist } from 'jsonapi-fractal';
import TourItem from '../../model/TourItem';

class TourItemTransformer extends Transformer<unknown, unknown> {
  constructor() {
    super();
    this.type = 'items';
  }

  transform(section: TourItem) {
    const whiteListAttrs = ['id', 'itemId', 'optional', 'count'];
    return whitelist(section, whiteListAttrs);
  }
}

export default TourItemTransformer;
