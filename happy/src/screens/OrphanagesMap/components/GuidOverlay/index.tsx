import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  setShowGuide: React.Dispatch<React.SetStateAction<boolean>>;
}

export function GuideOverlay({ setShowGuide }: Props) {

  function handleCloseGuide() {
    setShowGuide(false);
  }

  return (
    <Pressable
      onPress={handleCloseGuide}
      style={styles.container}
    >
      <LinearGradient
        colors={['#00c7c7', '#2AB5D1']}
        start={{x: 0, y: .2}}
        end={{x: .2, y: 1}}
        style={styles.gradient}
      />

      <View style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
        gap: 12
      }}>
        <Image
          source={require("../../../../assets/click.png")}
        />
        <Text style={{
          fontSize: 20,
          fontFamily: "Nunito_800ExtraBold",
          color: "#fff",
          textAlign: "center"
        }}>Toque no mapa para adicionar um orfanato</Text>
      </View>
    </Pressable>
  )
}

export const styles = StyleSheet.create({
  container: {
    zIndex: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    opacity: .6
  }
})
