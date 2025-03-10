import type { Convention } from 'convention'

const collection = ref<NestedPick<Convention<'collection/show'>, ['collection']> | null>(null)
const collectionAssets = shallowRef<NestedPick<Convention<'collection-asset/list'>, ['collectionAssets']>>([])

const mockData = [
  {
    attachment: 'https://fap.onl/uploads/photos/2025/01/Fap_929710d40d4c8fe72166bf73799a0d12.webp',
    collectionId: 'a17715d4-a1ad-46c3-927b-b0b8ec94cac7',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Колекція пікантних світлин, що відображають інтимну ніжність і грайливість, створені для справжніх цінителів естетики тіла.',
    id: '1f8275c8-afc8-4462-b3f4-15ef1aed1398',
    tags: ['інтимність', 'естетика', 'ніжність', 'гра світла'],
    title: 'Ніжна гра світла',
    type: 'image',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    // attachment: 'https://f005.backblazeb2.com/file/test-2239/Fap__a053845e4564523e23385f91d6e692e9.mp4',
    attachment: 'https://fap.onl/uploads/videos/2024/10/Fap__77fc3bead269a9e94c3f59dd009a16b2.mp4',
    // attachment: 'https://f005.backblazeb2.com/file/test-2239/43059.mp4',
    collectionId: 'b2486e72-4ac1-4e99-a8b2-b362ba27470b',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Збірка таємничих і спокусливих поз, які залишають простір для фантазії та підкреслюють природну красу.',
    id: '2a6174f9-34cb-4d84-8091-2c86f1e9a746',
    tags: ['таємничість', 'спокуса', 'природна краса', 'фантазія'],
    title: 'Секрети темряви',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/photos/2025/01/Fap_fff3aaa0b0111a24a502aaa0e1459a70.webp',
    collectionId: 'c35f5e11-498d-4cb1-896b-1b52d752da89',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Вибух пристрасті у кожному кадрі – колекція інтимних моментів, які демонструють чуттєву енергію.',
    id: '3d5f8e57-6076-4743-a5cd-8f21a6856e49',
    tags: ['пристрасть', 'чуттєвість', 'енергія', 'ніч', 'інтимність'],
    title: 'Палка ніч',
    type: 'image',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2025/01/Fap__97ef04e5fbb6eab3d268ed372d0fd714.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/photos/2024/12/Fap_86ec26a9c876b6bf65fee78f76daf380.webp',
    collectionId: 'e5fc1f9d-658f-490b-887b-ef6d2f819d94',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Насолода для очей – гармонійне поєднання інтимності й витонченості, яке надихає та розбурхує уяву.',
    id: '5f9c4e68-7ba9-4a7b-9c9b-f5e7d6f0d3a1',
    tags: ['витонченість', 'інтимність', 'уява', 'насолода', 'гармонія', 'естетика', 'краса'],
    title: 'Танець тіней',
    type: 'image',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
  {
    attachment: 'https://fap.onl/uploads/videos/2024/11/Fap__ff16398dbf7005bb1a95222bae750dc0.mp4',
    collectionId: 'd4e9b748-7db1-4763-b8b4-9a6de4f64aeb',
    createdAt: '2025-01-09T15:41:09.872Z',
    description:
      'Серія вишуканих портретів, де загадковий погляд і ледь помітні натяки розкривають світ внутрішніх бажань.',
    id: '4e8fbc66-53a4-4f0e-b725-3c8290f45c76',
    tags: ['погляд', 'загадковість', 'бажання', 'портрет', 'натяки', 'чуттєвість'],
    title: 'Таємниці душі 2.0',
    type: 'video',
    updatedAt: '2025-01-09T15:41:09.872Z',
  },
]

export function useAssets(): {
  collection: NestedPick<Convention<'collections/show'>, ['collection']> | null
  collectionAssets: NestedPick<Convention<'collection-assets/list'>, ['collectionAssets']>
  collectionId: string
  getCollectionAssets: () => Promise<void>
  getCollectionItem: () => Promise<void>
} {
  const app = useNuxtApp()
  const route = useRoute()
  const collectionId = ref(route.params.id as string)

  async function getCollectionAssets(): Promise<void> {
    const response = await app.$di.collections.assetsGetList(collectionId.value)

    if (response?.status === 'success') {
      collectionAssets.value = response.collectionAssets || []
      collectionAssets.value = [...mockData, ...collectionAssets.value]
      return
    }

    throw createError({
      fatal: true,
      statusCode: 404,
    })
  }

  async function getCollectionItem(): Promise<void> {
    const response = await app.$di.collections.collectionGetItem(collectionId.value)

    if (response?.status === 'success') {
      collection.value = response.collection
      return
    }
  }

  return reactive({
    collection,
    collectionAssets,
    collectionId,
    getCollectionAssets,
    getCollectionItem,
  })
}
