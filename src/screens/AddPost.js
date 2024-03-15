import React, { useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import axios from 'axios';

const baseUrl = 'https://guflu.in/Social_media/smedia_api.php';

export default function AddPost({ navigation }) {
    const [selectedImages, setSelectedImages] = useState([]);
    const [caption, setCaption] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);



    const removeImage = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    };

    const handleImagePicker = async () => {
        try {
            const images = await ImagePicker.openPicker({
                width: 350,
                height: 450,
                multiple: true,
                cropping: true,
                compressImageQuality: 0.5,
            });
            setSelectedImages(images.map((image) => ({ uri: image.path })));
        } catch (error) {
            console.error("Error selecting images:", error);
            Alert.alert("Error", "Failed to select images. Please try again.");
        }
    };

    const handleCameraPicker = async () => {
        try {
            const image = await ImagePicker.openCamera({
                width: 350,
                height: 450,
                cropping: true,
            });
            setSelectedImages([{ uri: image.path }]);
        } catch (error) {
            console.error("Error opening camera:", error);
            Alert.alert("Error", "Failed to open camera. Please try again.");
        }
    };

    const handlePost = async () => {
        setIsDisabled(true); // Disable the button
        setTimeout(() => {
            setIsDisabled(false); // Enable the button after 2 seconds
        }, 2000);
        try {
            const formData = new FormData();
            formData.append('route', 'posts');
            formData.append('user_id', '2'); // Change this to the appropriate user ID
            formData.append('caption', caption);
            selectedImages.forEach((image, index) => {
                formData.append(`image[${index}]`, {
                    uri: image.uri,
                    type: 'image/jpeg', // Adjust the type if necessary
                    name: `image_${index}.jpg`, // Adjust the filename as needed
                });
            });

            const response = await axios.post(baseUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert("Success", "Image posted successfully");
            setSelectedImages([]);
            setCaption("");
            console.log("Response:", response.data);
            // Handle success response here
        } catch (error) {
            console.error("Error posting:", error);
            // Handle error here
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionTitle}>What's on your mind...</Text>
                    <TouchableOpacity style={styles.dashedContainer} onPress={handleImagePicker}>
                        <View style={styles.innerContainer}>
                            <Icon name="add-circle" size={30} color="#007AFF" />
                            <Text style={styles.addPostText}>Open Gallery</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dashedContainer} onPress={handleCameraPicker}>
                        <View style={styles.innerContainer}>
                            <Icon name="camera" size={30} color="#007AFF" />
                            <Text style={styles.addPostText}>Open Camera</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.imageList}>
                        {selectedImages.map((item, index) => (
                            <View style={styles.imageContainer} key={index}>
                                <Image source={{ uri: item.uri }} style={styles.image} />
                                <TouchableOpacity
                                    onPress={() => removeImage(index)}
                                    style={styles.deleteButton}
                                >
                                    <Icon name="close" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.sectionTitle}>Write your thoughts</Text>
                    <TextInput
                        placeholder="Write a caption..."
                        placeholderTextColor="#000"
                        value={caption}
                        onChangeText={setCaption}
                        multiline={true}
                        style={styles.captionInput}
                    />

                    <TouchableOpacity style={[styles.button, isDisabled && styles.disabledButton]}
                        onPress={handlePost}
                        disabled={isDisabled}>
                        <Icon name="cloud-upload-outline" size={20} color="#fff" />
                        <Text style={styles.buttonText}>Post</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
    },
    main: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        color: "#555",
        marginTop: 10,
    },
    imageList: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    imageContainer: {
        position: "relative",
        margin: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    deleteButton: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "red",
        padding: 5,
        borderRadius: 10,
    },
    button: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        marginLeft: 5,
        fontSize: 16,
        color: "#fff",
    },
    disabledButton: {
        opacity: 0.5, // Change the opacity to indicate the button is disabled
      },
    dashedContainer: {
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#C4C4C4",
        borderStyle: "dashed",
        borderRadius: 5,
        padding: 20,
        marginTop: 10,
        height: 100
    },
    innerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    addPostText: {
        marginLeft: 10,
        fontSize: 16,
        color: "#007AFF",
    },
    captionInput: {
        borderWidth: 1,
        borderColor: "#C4C4C4",
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        minHeight: 100,
        color: 'black'
    },
});



