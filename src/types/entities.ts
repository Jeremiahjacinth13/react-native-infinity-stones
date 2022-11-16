import {RootStackParamList} from './navigation';

export type Project = {
  name: string;
  href: keyof RootStackParamList;
};
