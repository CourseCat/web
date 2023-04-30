import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const getCard = (elem, index, type) => {
  if (type === "schools") {
    return (
      <View style={styles.card} key={index}>
        <Image
          source={`https://corsproxy.io.?` + encodeURIComponent(elem.logoUrl)}
          style={{
            width: 100,
            height: 100,
            objectFit: "contain",
            marginRight: 10,
          }}
        />
        <View style={{ flex: 1 }} />
        <View>
          <Text>{elem.name}</Text>
          <Text
            style={{
              color: "grey",
              fontSize: 10,
              fontStyle: "italic",
              marginTop: 5,
            }}
          >
            {elem.address}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "flex-start",
              alignContent: "flex-start",
              justifyContent: "flex-start",
              marginTop: 8,
            }}
          >
            {elem.subjects.map((subject, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    backgroundColor: "#d04444",
                    color: "white",
                    padding: 5,
                    gap: 5,
                    marginRight: 5,
                    marginBottom: 5,
                    borderRadius: 5,
                    fontSize: 9,
                    rowGap: 5,
                  }}
                >
                  {subject.name}
                </Text>
              );
            })}
          </View>
          <Link
            style={{
              color: "blue",
              fontSize: 9,
              fontStyle: "italic",
              marginTop: 5,
            }}
          >
            {elem.website}
          </Link>
        </View>
      </View>
    );
  } else if (type === "courses") {
    return (
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 15,
            }}
          >
            {elem.name}
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: 12,
              fontStyle: "italic",
              marginTop: 5,
            }}
          >
            {elem.courseNumber}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 13,
              marginTop: 5,
            }}
          >
            {elem.description}
          </Text>
          <Text
            style={{
              color: "#d04444",
              fontSize: 13,
              marginTop: 6,
            }}
          >
            Subject : {elem.subject.name}
          </Text>
        </View>
      </View>
    );
  }
};

const exportPDF = (data, query, type) => {
  let filteredList = data.filter((elem) => {
    return elem.name.toLowerCase().includes(query.toLowerCase());
  });

  const MyDoc = () => (
    <Document>
      <Page size={"Letter"} style={styles.page}>
        <View style={styles.section}>
          <Text
            style={{
              paddingLeft: 20,
            }}
          >
            {filteredList.length} {type} found
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          {filteredList.map((elem, index) => {
            return getCard(elem, index, type);
          })}
        </View>
      </Page>
    </Document>
  );

  return MyDoc;
};

export default exportPDF;

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    paddingVertical: 20,
  },
  section: {
    marginTop: 3,
    padding: 10,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
