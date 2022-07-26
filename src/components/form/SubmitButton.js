import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";
import { useNavigation } from '@react-navigation/native';

function SubmitButton({ title, style }) {
  const { handleSubmit } = useFormikContext();
  const navigation = useNavigation();

  return <AppButton style={style} title={title} onPress={handleSubmit} />;
}

export default SubmitButton;