declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Component } from 'react';
  
  export interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
  }

  export default class Icon extends Component<IconProps> {
    static getImageSource(
      name: string,
      size?: number,
      color?: string
    ): Promise<any>;
    static getImageSourceSync(
      name: string,
      size?: number,
      color?: string
    ): any;
    static getRawGlyphMap(): { [name: string]: number };
    static loadFont(file?: string): Promise<void>;
    static hasIcon(name: string): boolean;
  }
} 