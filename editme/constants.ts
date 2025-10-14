import { Template } from './types';
import { 
    HugIcon, SareeIcon, SurpriseIcon, CoupleIcon, GirlfriendIcon, 
    BollywoodIcon, DiwaliIcon, DressIcon, WeddingIcon, CarIcon,
    VintageCameraIcon, PassportIcon, ArrowLeftIcon 
} from './components/icons';

export const TEMPLATES: Template[] = [
  {
    id: 'hug-younger-self',
    name: 'Hug Younger Self',
    description: 'Upload a childhood photo and a recent one to create a heartwarming hug across time.',
    icon: HugIcon,
    prompt: 'Create a highly realistic image where the adult from the second photo is warmly hugging the child from the first photo. The interaction should look natural, emotionally connected, and seamless. Ensure lighting, shadows, and textures blend perfectly to make it believable.',
    imageInputs: 2,
  },
  {
    id: 'saree-transformation',
    name: 'Saree Transformation',
    description: 'Turn your photo into a stunning portrait in a traditional Indian saree with different styles.',
    icon: SareeIcon,
    prompt: '', // Prompt is determined by options
    imageInputs: 1,
    options: [
      { 
        name: 'Black Saree',
        prompt: 'Convert the person in this photo into a retro vintage grainy but bright image, wearing an elegant black party-wear saree, 90s Bollywood film aesthetic. Lighting should be warm, with golden sunset tones evoking a golden hour glow. Keep the face recognizable.'
      },
      {
        name: 'White Saree',
        prompt: 'Create a 4K HD realistic portrait of the woman in the photo wearing a translucent white polka dot saree. Add a small pink flower tucked behind her ear. She should have a soft, serene expression, with cinematic profile shadow. Keep the face recognizable.'
      }
    ]
  },
  {
    id: 'hug-fav-person',
    name: 'Hug Your Favorite Person',
    description: 'Combine two photos to create a candid, polaroid-style picture of a cute hug.',
    icon: CoupleIcon,
    prompt: 'Create a Polaroid style photograph of the person from the first image and the person from the second image posing cutely together. The photo should have a natural, ordinary feel, with slight blur and consistent lighting, as if taken with a flash in a dim room. The background should be white curtains. Keep the faces unchanged and recognizable but capture a cozy, candid vibe between the two, like a sweet moment frozen on film.',
    imageInputs: 2,
  },
  {
    id: 'add-girlfriend',
    name: 'Add a Girlfriend',
    description: 'Add a virtual girlfriend to your photo for a fun, shareable picture.',
    icon: GirlfriendIcon,
    prompt: 'Add a beautiful girlfriend posing naturally with the person in this photo. The lighting should be realistic and match the original image. If the person is in traditional Indian attire, she should wear a matching traditional outfit (like a lehenga or saree). If the person wears modern clothes, she should wear stylish modern attire. The pose should be affectionate and look like a genuine couple photo.',
    imageInputs: 1,
  },
  {
    id: 'with-bollywood-celebs',
    name: 'With Bollywood Celebs',
    description: 'Picture yourself with a Bollywood superstar at a glamorous event.',
    icon: BollywoodIcon,
    prompt: 'Place the person from the photo next to a famous Bollywood celebrity like Shah Rukh Khan or Deepika Padukone at a red carpet movie premiere. The image should look like a realistic, high-quality candid shot by a professional photographer. Ensure lighting, shadows, and focus blend seamlessly.',
    imageInputs: 1,
  },
  {
    id: 'diwali-celebration',
    name: 'Diwali Celebration',
    description: 'Create a festive photo of you celebrating the festival of lights, Diwali.',
    icon: DiwaliIcon,
    prompt: 'Place the person from the photo in a beautifully decorated setting for a Diwali celebration, holding a glowing diya (oil lamp). They should be wearing a festive, elegant Indian traditional attire. The background should be filled with sparkling lights, rangoli art, and a warm, celebratory atmosphere.',
    imageInputs: 1,
  },
  {
    id: 'dress-me-up',
    name: 'Dress Me Up',
    description: 'Get a virtual makeover with a stunning, high-fashion traditional Indian outfit.',
    icon: DressIcon,
    prompt: 'Redress the person in the photo in a stunning, high-fashion traditional Indian outfit like a designer lehenga or an opulent sherwani. Place them in a grand, palace-like background (e.g., a Rajasthani fort). The entire image should look like a professional fashion photoshoot.',
    imageInputs: 1,
  },
  {
    id: 'indian-wedding',
    name: 'Traditional Indian Wedding',
    description: 'Imagine yourself as a bride or groom in a lavish, traditional Indian wedding.',
    icon: WeddingIcon,
    prompt: 'Transform the photo to show the person as a bride or groom in a lavish traditional Indian wedding ceremony. They should be wearing ornate, royal wedding attire, adorned with jewelry, surrounded by festive decorations, vibrant colors, and a joyous atmosphere.',
    imageInputs: 1,
  },
  {
    id: 'supercar-model',
    name: 'Supercar Model Pose',
    description: 'Pose like a model next to a luxurious supercar in a cool urban setting.',
    icon: CarIcon,
    prompt: 'Place the person from the photo posing confidently next to a luxury supercar (like a Lamborghini or Ferrari) in a modern, urban setting at night. The lighting should be dramatic with neon reflections, highlighting both the person (in stylish attire) and the car.',
    imageInputs: 1,
  },
   {
    id: 'vintage-look',
    name: 'Vintage Look',
    description: 'Travel back in time with a classic 90s Bollywood film-style photo.',
    icon: VintageCameraIcon,
    prompt: 'Convert this photo into a 90s Bollywood film still. Add a grainy texture, warm, saturated color tones, and a slightly dramatic, cinematic look. The person should be styled in 90s fashion and hairstyle. Make the face recognizable.',
    imageInputs: 1,
  },
  {
    id: 'passport-photo',
    name: 'Passport Photo Pro',
    description: 'Generate a professional, high-quality passport photo from any picture.',
    icon: PassportIcon,
    prompt: 'Generate a professional passport-style photograph from this image. The background must be plain white. The lighting should be bright and even, with no shadows on the face. The person should have a neutral expression, looking directly at the camera, and be wearing simple, formal attire. Ensure the face is clear, centered, and fully recognizable.',
    imageInputs: 1,
  },
  {
    id: 'surprise-me',
    name: 'Surprise Me!',
    description: 'Feeling lucky? Let our AI create a fun, cute, and surprising image for you.',
    icon: SurpriseIcon,
    prompt: 'Analyze the person in the image and transform this photo into something surprising, funny, and cute, reflecting vibrant Indian culture. Examples: make them the hero of a comic book, a street food vendor with a funny twist, or humorously interacting with a famous Indian monument. Avoid anything offensive or racist.',
    imageInputs: 1,
  },
];
