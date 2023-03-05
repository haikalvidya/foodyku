import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dishes',
  title: 'Dishes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of Dish',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description of Dish',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'price',
      title: 'Price of Dish in RP',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Image of Dish',
      type: 'image',
    }),
  ],
});
