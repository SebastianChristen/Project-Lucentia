import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  account: {
    marginBottom: 20,
    alignItems: "center",
  },
  chatsList: {
    marginBottom: 20,
  },
  chat: {
    fontSize: 18,
    marginBottom: 10,
    color: "#007BFF",
  },
  messageWrapper: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    marginBottom: 20,
  },
  messageForm: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
  },
});

export default styles