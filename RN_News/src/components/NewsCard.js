import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const NewsCard = ({ article }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Web', { url: article.url })} style={{
            height: '150', width: '90%', borderWidth: 1, alignSelf: 'center', marginTop: 20, flexDirection: 'row', alignItems: 'center', borderColor: 'lightgrey'
        }}>
            {/* News Image */}
            {
                article.urlToImage != null ? (
                    <View style={{ height: 120, width: 80, borderWidth: 1, marginTop: 5, marginLeft: 10 }}>
                        {article.urlToImage && (
                            <Image source={{ uri: article.urlToImage }} height={120} width={80} resizeMode='stretch' />
                        )}
                    </View>
                ) : (
                    null
                )
            }
            {/* Headline */}
            <View style={{ height: 120, width: '70%', marginLeft: 5, alignItems: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }} numberOfLines={2}>{article.title.length < 60 ? article.title : article.title.slice(0, 60)}</Text>
                <Text style={{ textAlign: 'center', fontSize: 14, color: 'gray' }} numberOfLines={4}>{article.description}</Text>
            </View>

        </TouchableOpacity>
    )
}

export default NewsCard

const styles = StyleSheet.create({})