import React from "react";
import Modal from "react-native-modalbox";
import { Image } from "react-native";
import { View, Text, Button, Icon } from "native-base";
import CustomButton from "./CustomButton";
import styles from "../styles/components/CustomSubmitAlert";
import PropTypes from "prop-types";

const CustomSubmitAlert = props => {
  const {
    isOpen,
    showCustomAlert,
    length,
    count,
    confirmSubmit,
    roundType
  } = props;
  return (
    <View style={styles.modalView}>
      <Modal
        isDisabled={false}
        coverScreen={true}
        backdropPressToClose={true}
        swipeToClose={false}
        style={styles.modal}
        position={"center"}
        isOpen={isOpen}
        onClosed={() => showCustomAlert(false)}
      >
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            onPress={() => {
              showCustomAlert(false);
            }}
            style={styles.closeBtnStyle}
            transparent
            primary
          >
            <Icon style={styles.closeIconStyle} name="close" />
          </Button>
        </View>
        <View style={styles.modalContentView}>
          <View style={styles.modalImageView}>
            <Image
              resizeMode="contain"
              style={styles.modalImageStyle}
              source={require("../images/clipboard.png")}
            />
          </View>
          <View style={styles.modalTextView}>
            <Text style={[styles.cnfrm, styles.confirmText]}>
              CONFIRM PLEASE
            </Text>
            {/* {roundType === "Objective" && (
              <Text style={[styles.cnfrm, styles.modalText]}>
                {`You have attempted ${length}/${count} questions`}
              </Text>
            )} */}
            <Text style={[styles.cnfrm, styles.modalText]}>
              Are you sure you want to submit your test?
              {/* {roundType === "Objective" &&
                `You Won't be able to
              change your response after submitting the test`} */}
            </Text>
            <View style={styles.modalBtnView}>
              <CustomButton
                onPress={() => {
                  showCustomAlert(false);
                }}
                btnStyle={styles.cancelBtnStyle}
                btnTextStyle={styles.btnTextStyle}
                text={"CANCEL"}
                type={"rounded"}
              />
              <CustomButton
                onPress={() => {
                  confirmSubmit();
                }}
                btnStyle={styles.okBtnStyle}
                btnTextStyle={styles.btnTextStyle}
                text={"OK"}
                type={"rounded"}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
CustomSubmitAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  showCustomAlert: PropTypes.func.isRequired,
  length: PropTypes.number,
  count: PropTypes.number,
  confirmSubmit: PropTypes.func.isRequired,
  // roundType: PropTypes.string
};
export default CustomSubmitAlert;
