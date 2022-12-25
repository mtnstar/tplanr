import { Transformer, whitelist } from 'jsonapi-fractal';
import Section from '../../model/Section';

class SectionTransformer extends Transformer<unknown, unknown> {
  constructor() {
    super();
    this.type = 'sections';
  }

  transform(section: Section) {
    const whiteListAttrs = [
      'id',
      'label',
      'details',
      'startAt',
      'endAt',
      'type',
    ];
    return whitelist(section, whiteListAttrs);
  }
}

export default SectionTransformer;
