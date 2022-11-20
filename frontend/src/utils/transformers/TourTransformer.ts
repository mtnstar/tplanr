import Tour from '../../model/Tour';
import { Transformer, whitelist } from 'jsonapi-fractal';

class TourTransformer extends Transformer<unknown, unknown> {
  constructor() {
    super();
    this.type = 'tours';
  }

  transform(tour: Tour) {
    return whitelist(tour, ['id', 'label', 'description', 'avatar']);
  }
}

export default TourTransformer;
