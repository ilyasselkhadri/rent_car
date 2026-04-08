import type { CollectionConfig } from 'payload'

export const Menu: CollectionConfig = {
  slug: 'menu',
  labels: {
    singular: 'Plat',
    plural: 'Plats',
  },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'categorie', 'prix', 'disponible', 'popularite'],
    description: 'Gérez les plats du restaurant Dghmira',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nom',
      type: 'text',
      label: 'Nom du plat',
      required: true,
    },
    {
      name: 'categorie',
      type: 'select',
      label: 'Catégorie',
      required: true,
      options: [
        { label: 'Promotions', value: 'promotions' },
        { label: 'Top des ventes', value: 'top_ventes' },
        { label: 'Nos entrées', value: 'entrees' },
        { label: 'Nos Formules', value: 'formules' },
        { label: 'Sandwicherie Marocaine', value: 'sandwicherie' },
        { label: 'Nos Pastillas', value: 'pastillas' },
        { label: 'Sandwichs Tajines', value: 'sandwichs_tajines' },
        { label: 'Tajines De Viande', value: 'tajines_viande' },
        { label: 'Tajines Au Poulet', value: 'tajines_poulet' },
        { label: 'Boissons', value: 'boissons' },
      ],
    },
    {
      name: 'prix',
      type: 'number',
      label: 'Prix (MAD)',
      required: true,
      min: 0,
    },
    {
      name: 'prixPromotion',
      type: 'number',
      label: 'Prix en promotion (MAD)',
      min: 0,
      admin: {
        description: 'Laissez vide si pas de promotion',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description du plat',
      required: true,
      admin: {
        rows: 3,
      },
    },
    
    // Image principale
    {
      name: 'image',
      type: 'upload',
      label: 'Image du plat',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload l\'image principale du plat',
      },
    },

    // Galerie d'images
    {
      name: 'galerie',
      type: 'array',
      label: 'Galerie photos',
      admin: {
        description: 'Photos supplémentaires du plat (optionnel)',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Photo',
        },
        {
          name: 'legende',
          type: 'text',
          label: 'Légende',
        },
      ],
    },

    // Options de personnalisation
    {
      name: 'options',
      type: 'array',
      label: 'Options de personnalisation',
      admin: {
        description: 'Ex: suppléments, pains, sauces, etc.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'nomOption',
          type: 'text',
          label: 'Nom de l\'option',
          required: true,
        },
        {
          name: 'prixOption',
          type: 'number',
          label: 'Prix supplémentaire (MAD)',
          min: 0,
        },
      ],
    },

    // Sidebar
    {
      name: 'disponible',
      type: 'checkbox',
      label: 'Disponible à la commande',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'popularite',
      type: 'number',
      label: 'Popularité',
      defaultValue: 0,
      min: 0,
      max: 5,
      admin: {
        position: 'sidebar',
        description: '0 à 5 étoiles',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Mettre en avant (Top des ventes)',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'ordre',
      type: 'number',
      label: "Ordre d'affichage",
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}