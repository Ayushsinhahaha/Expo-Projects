import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import NewsCard from '../components/NewsCard'

// fetch key from NEWSAPI website
const API = ''
const URL = `https://newsapi.org/v2/everything?q=keyword&apiKey=${API}`


const HomeScreen = () => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')


    console.log('articles', articles)
    const fetchData = async () => {
        const data = await fetch(URL).then(res => res.json());
        setArticles(data.articles)
        setLoading(false)
        // console.log('data', data.totalResults)

    }

    useEffect(() => {
        fetchData();
    }, [])




    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* Header */}
            <Header />
            {loading ? (
                <ActivityIndicator size='large' />
            ) : (
                <ScrollView >
                    <View style={{ alignItems: 'flex-start', paddingHorizontal: 20, borderWidth: 1, width: '90%', alignSelf: 'center', marginTop: 10, borderColor: 'lightgrey' }}   >
                        <TextInput style={{ width: '80%' }} placeholder='Search news...' value={searchText} onChangeText={txt => setSearchText(txt)} />
                    </View>
                    {articles.filter(article => article.title.toLowerCase().includes(searchText.toLowerCase()) && article.urlToImage !== null).map((item, id) => {
                        return (
                            <NewsCard article={item} />
                        )
                    })}
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})