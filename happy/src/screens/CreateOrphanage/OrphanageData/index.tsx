import React, { useLayoutEffect, useState } from 'react';
import { Button, Modal, ScrollView, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation';

import { CreateOrphanageModel } from './models/create-orphanage-schema';

import { OrphanageDataStepOne } from './components/OrphanageDataStepOne';
import { OrphanageDataStepTwo } from './components/OrphanageDataStepTwo';

import { styles } from './styles';
import { Header } from '../../../ui/Header';
import { OrphanageDataCancel } from './components/OrphanageDataCancel';

type OrphanageDataProps = NativeStackScreenProps<RootStackParamList, "OrphanageData">;

export function OrphanageData({ navigation, route }: OrphanageDataProps) {
  const position = route.params.position;

  const [ step, setStep ] = useState(1);
  const [ orphanageData, setOrphanageData ] = useState<CreateOrphanageModel>({} as CreateOrphanageModel);
  const [ showModal, setShowModal ] = useState<"success" | "cancel" | "">("");

  function handleGoBack() {
    if(step === 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
        header: (props) => (
          <Header
            title="Adicione um orfanato"
            customHandleBack={handleGoBack}
            customHandleCancel={() => setShowModal("cancel")}
            showCancel={true}
            {...props}
          />
        ),
    });
}, [navigation, step]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 24
      }}
      style={styles.container}
    >

      {step === 1 && (
        <OrphanageDataStepOne
          orphanageData={orphanageData}
          setOrphanageData={setOrphanageData}
          setStep={setStep}
        />
      )}

      {step === 2 && (
       <OrphanageDataStepTwo
          position={position}
          navigation={navigation}
          orphanageData={orphanageData}
          setOrphanageData={setOrphanageData}
        />
      )}

      <OrphanageDataCancel
        visible={showModal === "cancel"}
        handleNavigateToOrphanagesMap={() => {
          setShowModal("");
          setTimeout(() => navigation.navigate("Home"), 100);
        }}
        handleCancel={() => setShowModal("")}
      />
    </ScrollView>
  )
}
