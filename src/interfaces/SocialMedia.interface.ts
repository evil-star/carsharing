type SocialMediaTypes = 'telegram' | 'facebook' | 'instagram' | undefined;

export interface SocialMedia {
  type: SocialMediaTypes;
  href: string;
}
