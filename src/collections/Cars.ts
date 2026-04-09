import type { CollectionConfig } from 'payload'

export const Cars: CollectionConfig = {
  slug: 'cars',
  labels: {
    singular: 'Voiture',
    plural: 'Voitures',
  },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'brand', 'type', 'prix', 'disponible'],
    description: 'Gérez le parc de véhicules',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nom',
      type: 'text',
      label: 'Nom du véhicule',
      required: true,
    },
    {
      name: 'brand',
      type: 'select',
      label: 'Marque',
      required: true,
      options: [
        { label: 'Dacia',      value: 'dacia' },
        { label: 'Renault',    value: 'renault' },
        { label: 'Peugeot',    value: 'peugeot' },
        { label: 'Citroën',    value: 'citroen' },
        { label: 'Volkswagen', value: 'volkswagen' },
        { label: 'Toyota',     value: 'toyota' },
        { label: 'Hyundai',    value: 'hyundai' },
        { label: 'Kia',        value: 'kia' },
        { label: 'Ford',       value: 'ford' },
        { label: 'BMW',        value: 'bmw' },
        { label: 'Mercedes',   value: 'mercedes' },
        { label: 'Audi',       value: 'audi' },
        { label: 'Seat',       value: 'seat' },
        { label: 'Skoda',      value: 'skoda' },
        { label: 'Fiat',       value: 'fiat' },
        { label: 'Autre',      value: 'autre' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type de véhicule',
      required: true,
      options: [
        { label: 'Citadine',   value: 'citadine' },
        { label: 'Berline',    value: 'berline' },
        { label: 'SUV',        value: 'suv' },
        { label: '4x4',        value: '4x4' },
        { label: 'Break',      value: 'break' },
        { label: 'Monospace',  value: 'monospace' },
        { label: 'Utilitaire', value: 'utilitaire' },
        { label: 'Cabriolet',  value: 'cabriolet' },
        { label: 'Coupé',      value: 'coupe' },
      ],
    },
    {
      name: 'transmission',
      type: 'select',
      label: 'Transmission',
      required: true,
      options: [
        { label: 'Manuelle',    value: 'manuelle' },
        { label: 'Automatique', value: 'automatique' },
      ],
    },
    {
      name: 'carburant',
      type: 'select',
      label: 'Carburant',
      required: true,
      options: [
        { label: 'Essence',    value: 'essence' },
        { label: 'Diesel',     value: 'diesel' },
        { label: 'Hybride',    value: 'hybride' },
        { label: 'Électrique', value: 'electrique' },
        { label: 'GPL',        value: 'gpl' },
      ],
    },
    {
      name: 'couleur',
      type: 'text',
      label: 'Couleur',
    },
    {
      name: 'immatriculation',
      type: 'text',
      label: 'Immatriculation',
    },

    // Prix
    {
      name: 'prix',
      type: 'number',
      label: 'Prix / jour (MAD)',
      required: true,
      min: 0,
    },
    {
      name: 'prixSemaine',
      type: 'number',
      label: 'Prix / semaine (MAD)',
      min: 0,
    },
    {
      name: 'prixMois',
      type: 'number',
      label: 'Prix / mois (MAD)',
      min: 0,
    },

    // Détails techniques
    {
      name: 'details',
      type: 'group',
      label: 'Détails techniques',
      fields: [
        { name: 'annee',         type: 'number',   label: 'Année',            min: 2000, max: 2030 },
        { name: 'kilometrage',   type: 'number',   label: 'Kilométrage',      min: 0 },
        { name: 'places',        type: 'number',   label: 'Nombre de places', min: 2, max: 9, defaultValue: 5 },
        { name: 'portes',        type: 'number',   label: 'Nombre de portes', min: 2, max: 5, defaultValue: 4 },
        { name: 'climatisation', type: 'checkbox', label: 'Climatisation',    defaultValue: true },
        { name: 'gps',           type: 'checkbox', label: 'GPS',              defaultValue: false },
        { name: 'bluetooth',     type: 'checkbox', label: 'Bluetooth',        defaultValue: false },
        { name: 'camera',        type: 'checkbox', label: 'Caméra de recul',  defaultValue: false },
      ],
    },

    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },

    // Image principale
    {
      name: 'imageprincipale',
      type: 'upload',
      label: 'Image principale',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload l\'image principale du véhicule',
      },
    },

    // Galerie d'images - Plusieurs images possibles
    {
      name: 'galerie',
      type: 'array',
      label: 'Galerie photos',
      admin: {
        description: 'Ajoutez plusieurs photos (4, 5, 10 ou plus selon vos besoins)',
        initCollapsed: false,
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
          admin: {
            description: 'Ex: Vue avant, Intérieur, Coffre, Moteur...',
          },
        },
      ],
    },

    // Sidebar
    {
      name: 'disponible',
      type: 'checkbox',
      label: 'Disponible à la location',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Mettre en avant',
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