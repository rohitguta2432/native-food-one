import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Yelp from '../api/Yelp';
import SearchBar from '../component/SearchBar'
import useResults from '../hooks/useResults';
import ResultList from '../component/ResultList'

const SearchScreen = (searchTerm) => {

    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    //const [searchApi,results,errorMessage] = useState();

    const filterResultByPrice = (price) => {

        return results.filter(result => {
            return result.price === price;
        });

    };

    const searchApi = async searchTerm => {
        console.log('hi there !')
        try {
            const response = await Yelp.get('/search', {
                params: {
                    limit: 50,
                    term: searchTerm,
                    location: 'san jose'
                }
            });
            setResults(response.data.businesses);
        } catch (error) {
            setErrorMessage('something went wrong')
        }
    }
    useEffect(() => {
        searchApi('pasta');
    }, [])

    return (
        <View style={{flex:1}}>
            <SearchBar
                term={term}
                onTermChange={(newTerm) => setTerm(newTerm)}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Text> We have found {results.length} results</Text>
            <ScrollView>
                <ResultList results={filterResultByPrice('$')} title="Cost Effective" />
                <ResultList results={filterResultByPrice('$$')} title="Bit Pricier" />
                <ResultList results={filterResultByPrice('$$$')} title="Big Spender" />
            </ScrollView>
        </View>
    )

}


export default SearchScreen
