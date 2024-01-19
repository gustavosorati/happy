import { NativeStackHeaderProps } from "@react-navigation/native-stack"

export type HeaderProps = NativeStackHeaderProps & {
  title: string;
  showCancel?: boolean;
  customHandleBack?: () => void;
  customHandleCancel?: () => void;
}
