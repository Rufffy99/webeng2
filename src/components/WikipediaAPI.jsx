import { useState, useEffect } from "react";
import { WikipediaResult } from "./WikipediaResult";

// function buildUrl(baseUrl, searchParams) {
//   const queryString = new URLSearchParams(searchParams).toString();
//   return `${baseUrl}?${queryString}`;
// }

function SearchWikipedia () {
    const [wikipediaResults, setWikipediaResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const baseUrl = "http://en.wikipedia.org/w/api.php";

    let searchTerm = "Friedrichshafen";

    let searchParams = {
        origin: "*",
        action: "query",
        format: "json",
        list: "search",
        formatVersion: "2",
        srsearch: searchTerm
    };

    const buildUrl = (baseUrl, searchParams) => {
        const queryString = new URLSearchParams(searchParams).toString();
        return `${baseUrl}?${queryString}`;
    };

    const processWikipediaResults = (rawSearchResult) => {
        let result = rawSearchResult.query.search;
        return result
    };

    const fetchWikipediaResults = async (url) => {
        setLoading(true);
        fetch (url)
            .then((response) => response.json())
            .then((data) => {
                let results = processWikipediaResults(data);
                return results;
            })
            .then((results) => {
                let pageIds = results.map((result) => result.pageid);
                let searchParams = {
                    origin: "*",
                    action: "query",
                    prop: "info",
                    inprop: "url",
                    format: "json",
                    pageids: pageIds.join('|')
                };
                let url = buildUrl(baseUrl, searchParams);
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        let {query: {pages}}= data;
                        results.map((result) => {
                            result.url = pages[result.pageid].fullurl;
                            // console.log(result)
                        });
                        setWikipediaResults(results);
                        setLoading(false);
                    });
            })
    }

    useEffect(() => {
        let url = buildUrl(baseUrl, searchParams);
        fetchWikipediaResults(url);
    }, []);

    return (
        <section className="wikipedia-results">
            {wikipediaResults.map((wikipediaResult) =>
                <WikipediaResult
                    title = {wikipediaResult.title}
                    snippet = {wikipediaResult.snippet}
                    url = {wikipediaResult.url}
                    loading = {loading}
                />
            )}
        </section>
    )

}


// async function searchingWikipedia () {
//     const baseUrl = "http://en.wikipedia.org/w/api.php";

//     let searchTerm c= "Friedrichshafen";
//     let searchParams = {
//         origin: "*",
//         action: "query",
//         format: "json",
//         list: "search",
//         formatVersion: "2",
//         srsearch: searchTerm
//     };

//     let url = buildUrl(baseUrl, searchParams);
//     fetch(url)
//         .then((response) => {return response.json()})
//         .then((responseData) => {
//             console.log(responseData);
//             console.log(responseData.query.search[0])
//         })
// }

export {SearchWikipedia};