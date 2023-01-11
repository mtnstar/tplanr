import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { ItemCategories, ItemCategory } from '../../model/Item';
import ItemListItem from '../../model/ItemListItem';
import Tour from '../../model/Tour';
import { useTourItemsQuery } from '../queries/useTourItemsQuery';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  title: {
    margin: 10,
    padding: 10,
    fontWeight: 'heavy',
  },
  itemListByCategory: {
    margin: 10,
    padding: 5,
  },
});

interface TourItemListPdfParams {
  tour: Tour;
  items: readonly ItemListItem[];
}

export default function TourItemListPdf(props: TourItemListPdfParams) {
  const { t } = useTranslation();
  const { tour, items } = props;
  const pdfTitle = `${tour.label} - ${t('many', {
    keyPrefix: 'item',
  })}`;

  function itemsByCategory(category: ItemCategory) {
    if (!items) return [];

    return items.filter((item: ItemListItem) => item.itemCategory === category);
  }

  function itemCard(item: ItemListItem) {
    return <Text>{`${item.count}x ${item.labelDe}`}</Text>;
  }

  const itemsByCategorySections = ItemCategories.map(
    (itemCategory: ItemCategory) => {
      const categoryItems = itemsByCategory(itemCategory);
      const itemCards = categoryItems.map((item) => itemCard(item));
      return (
        <View style={styles.itemListByCategory}>
          <Text>{t(itemCategory, { keyPrefix: 'itemCategories' })}</Text>
          {itemCards}
        </View>
      );
    },
  );

  return (
    <Document title={pdfTitle}>
      <Page size='A4' style={styles.page}>
        <View style={styles.title}>
          <Text>{pdfTitle}</Text>
        </View>
        {itemsByCategorySections}
      </Page>
    </Document>
  );
}
