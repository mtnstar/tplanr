import Tour from '../../model/Tour';
import { Transformer, whitelist } from 'jsonapi-fractal';

class TourTransformer extends Transformer<unknown, unknown> {
  constructor() {
    super();
    this.type = 'tours';
  }

  transform(tour: Tour) {
    const whiteListAttrs = [
      'id',
      'label',
      'description',
      'avatar',
      'startAt',
      'endAt',
    ];
    return whitelist(tour, whiteListAttrs);
  }
}

export default TourTransformer;
