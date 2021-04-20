import React from "react";
import { Snackbar } from "react-native-paper";

import { DispatchContext, StateContext } from "../../contexts/appContext";
import { setSnackbar } from "../../reducers/reducer";

const Notificator = () => {
  const { snackbar } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  return (
    <Snackbar
      visible={snackbar.visible}
      duration={5000}
      onDismiss={() => dispatch(setSnackbar(false))}
      action={{
        label: "Close",
        onPress: () => dispatch(setSnackbar(false))
      }}
    >
      {snackbar.message}
    </Snackbar>
  );
};

export default Notificator;