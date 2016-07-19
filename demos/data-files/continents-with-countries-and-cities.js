var continentsWithCountries = [{
    Text: "North America",
    Description: "North America is a continent wholly within the Northern Hemisphere and almost wholly within the Western Hemisphere. It is also considered a northern subcontinent of the Americas. It is bordered to the north by the Arctic Ocean, to the east by the Atlantic Ocean, to the west and south by the Pacific Ocean, and to the southeast by South America and the Caribbean Sea.",
    Countries: [{
        Text: "United States",
        Description: "The United States of America (USA), commonly called the United States (US or U.S.) and America, is a federal constitutional republic consisting of fifty states and a federal district. The country is situated mostly in central North America, where its forty-eight contiguous states and Washington, D.C., the capital district, lie between the Pacific and Atlantic Oceans, bordered by Canada to the north and Mexico to the south."
    }, {
        Text: "Canada",
        Description: "Canada is a North American country consisting of ten provinces and three territories. Located in the northern part of the continent, it extends from the Atlantic to the Pacific and northward into the Arctic Ocean. Canada is the world's second-largest country by total area, and its common border with the United States is the world's longest land border."
    }, {
        Text: "Mexico",
        Description: "Mexico , officially the United Mexican States, is a federal constitutional republic in North America. It is bordered on the north by the United States of America; on the south and west by the Pacific Ocean; on the southeast by Guatemala, Belize, and the Caribbean Sea; and on the east by the Gulf of Mexico."
    }]
}, {
    Text: "South America",
    Description: "South America is a continent located in the Western Hemisphere, mostly in the Southern Hemisphere, with a relatively small portion in the Northern Hemisphere.",
    Countries: [{
        Text: "Brazil",
        Description: "Brazil , officially the Federative Republic of Brazil, is the largest country in South America and in the Latin America region. It is the world's fifth largest country, both by geographical area and by population with over 193 million people. It is the largest Lusophone country in the world, and the only one in the Americas."
    }, {
        Text: "Uruguay",
        Description: "Uruguay , officially the Oriental Republic of Uruguay and sometimes called the Eastern Republic of Uruguay, is a country in the southeastern part of South America."
    }]
}, {
    Text: "Europe",
    Description: "Europe is, by convention, one of the world's seven continents. Comprising the westernmost peninsula of Eurasia, Europe is generally divided from Asia by the watershed divides of the Ural and Caucasus Mountains, the Ural River, the Caspian and Black Seas, and the waterways connecting the Black and Aegean Seas. Europe is bordered by the Arctic Ocean to the north, the Atlantic Ocean to the west, the Mediterranean Sea to the south, and the Black Sea and connected waterways to the southeast. Yet the borders of Europe-a concept dating back to classical antiquity-are somewhat arbitrary, as the primarily physiographic term continent can incorporate cultural and political elements.",
    Countries: [{
        Text: "United Kingdom",
        Description: "The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom (UK) and Britain, is a sovereign state located off the north-western coast of continental Europe. The country includes the island of Great Britain, the north-eastern part of the island of Ireland, and many smaller islands. Northern Ireland is the only part of the UK that shares a land border with another state - the Republic of Ireland."
    }, {
        Text: "Germany",
        Description: "Germany, officially the Federal Republic of Germany , is a federal parliamentary republic in west-central Europe. The country consists of 16 states, and its capital and largest city is Berlin."
    }, {
        Text: "Bulgaria",
        Description: "Bulgaria, officially the Republic of Bulgaria, is a country located in Southeastern Europe. It is bordered by Romania to the north, Serbia and Macedonia to the west, Greece and Turkey to the south and the Black Sea to the east."
    }]
}, {
    Text: "Asia",
    Description: "Asia is the world's largest and most populous continent, located primarily in the eastern and northern hemispheres. It covers 8.7% of the Earth's total surface area and comprises 30% of its land area. With approximately 4.3 billion people, it hosts 60% of the world's current human population. Asia has a high growth rate in the modern era. For instance, during the 20th century, Asia's population nearly quadrupled.",
    Countries: [{
        Text: "Japan",
        Description: "Japan is an island nation in East Asia. Located in the Pacific Ocean, it lies to the east of the Sea of Japan, China, North Korea, South Korea and Russia, stretching from the Sea of Okhotsk in the north to the East China Sea and Taiwan in the south. The characters that make up Japan's name mean 'sun-origin', which is why Japan is sometimes referred to as the 'Land of the Rising Sun'."
    }, {
        Text: "China",
        Description: "China, officially the People's Republic of China (PRC), is a sovereign state located in East Asia. It is the world's most populous country, with a population of over 1.35 billion. The PRC is a single-party state governed by the Communist Party, with its seat of government in the capital city of Beijing.[14] It exercises jurisdiction over 22 provinces, five autonomous regions, four direct-controlled municipalities (Beijing, Tianjin, Shanghai, and Chongqing), and two mostly self-governing special administrative regions (Hong Kong and Macau). The PRC also claims Taiwan - which is controlled by the Republic of China (ROC), a separate political entity - as its 23rd province, a claim controversial due to the complex political status of Taiwan and the unresolved Chinese Civil War."
    }]
}];

var continentsWithCountriesAndCitiesCoordinates = [{
    Text: "North America",
    Latitude: 46.0730555556,
    Longitude: -100.546666667,
    Countries: [{
        Text: "United States",
        Latitude: 38,
        Longitude: -97,
        Cities: [{
            Name: "Los Angeles",
            Country: "United States",
            Latitude: 34.0522,
            Longitude: -118.2434
        }, {
            Name: "New York",
            Country: "United States",
            Latitude: 40.7561,
            Longitude: -73.9870
        }, {
            Name: "Chicago",
            Country: "United States",
            Latitude: 41.840,
            Longitude: -87.680
        }, {
            Name: "Houston",
            Country: "United States",
            Latitude: 29.770,
            Longitude: -95.390
        }]
    }, {
        Text: "Canada",
        Latitude: 60,
        Longitude: -95,
        Cities: [{
            Name: "Toronto",
            Country: "Canada",
            Latitude: 43.650,
            Longitude: -79.380
        }, {
            Name: "Montreal",
            Country: "Canada",
            Latitude: 45.520,
            Longitude: -73.570
        }, {
            Name: "Vancouver",
            Country: "Canada",
            Latitude: 49.280,
            Longitude: -123.130
        }, {
            Name: "Calgary",
            Country: "Canada",
            Latitude: 51.050,
            Longitude: -114.060
        }]
    }, {
        Text: "Mexico",
        Latitude: 23,
        Longitude: -102,
        Cities: [{
            Name: "Mexico City",
            Country: "Mexico",
            Latitude: 19.4270,
            Longitude: -99.1276
        }, {
            Name: "Ecatepec",
            Country: "Mexico",
            Latitude: 19.600,
            Longitude: -99.050
        }, {
            Name: "Guadalajara",
            Country: "Mexico",
            Latitude: 20.670,
            Longitude: -103.350
        }, {
            Name: "Puebla",
            Country: "Mexico",
            Latitude: 19.050,
            Longitude: -98.220
        }]
    }]
}, {
    Text: "South America",
    Latitude: -14.6047222222,
    Longitude: -57.6561111111,
    Countries: [{
        Text: "Brazil",
        Latitude: -10,
        Longitude: -55,
        Cities: [{
            Name: "Sao Paulo",
            Country: "Brasil",
            Latitude: -23.5489,
            Longitude: -46.6388
        }, {
            Name: "Rio de janeiro",
            Country: "Brasil",
            Latitude: -22.910,
            Longitude: -43.200
        }, {
            Name: "Salvador",
            Country: "Brasil",
            Latitude: -12.970,
            Longitude: -38.500
        }]
    }, {
        Text: "Uruguay",
        Latitude: -33,
        Longitude: -56,
        Cities: [{
            Name: "Montevideo",
            Country: "Uruguay",
            Latitude: -34.870,
            Longitude: -56.170
        }, {
            Name: "Salto",
            Country: "Uruguay",
            Latitude: -31.400,
            Longitude: -57.960
        }, {
            Name: "Ciudad de la costa",
            Country: "Uruguay",
            Latitude: -34.820,
            Longitude: -55.950
        }]
    }]
}, {
    Text: "Europe",
    Latitude: 48.6908333333,
    Longitude: 9.14055555556,
    Countries: [{
        Text: "England",
        Latitude: 54,
        Longitude: -2,
        Cities: [{
            Name: "London",
            Country: "England",
            Latitude: 51.50,
            Longitude: 0.12
        }, {
            Name: "Glasgow",
            Country: "England",
            Latitude: 55.870,
            Longitude: -4.270
        }, {
            Name: "Birmingham",
            Country: "England",
            Latitude: 52.480,
            Longitude: -1.910
        }]
    }, {
        Text: "Germany",
        Latitude: 51,
        Longitude: 9,
        Cities: [{
            Name: "Berlin",
            Country: "Germany",
            Latitude: 52.50,
            Longitude: 13.33
        }, {
            Name: "Hamburg",
            Country: "Germany",
            Latitude: 53.550,
            Longitude: 10.000
        }, {
            Name: "Munchen",
            Country: "Germany",
            Latitude: 48.140,
            Longitude: 11.580
        }]
    }, {
        Text: "Bulgaria",
        Latitude: 43,
        Longitude: 25,
        Cities: [{
            Name: "Sofia",
            Country: "Bulgaria",
            Latitude: 42.697845,
            Longitude: 23.321925
        }, {
            Name: "Plovdiv",
            Country: "Bulgaria",
            Latitude: 42.150,
            Longitude: 24.750
        }, {
            Name: "Burgas",
            Country: "Bulgaria",
            Latitude: 42.510,
            Longitude: 27.470
        }]
    }]
}, {
    Text: "Asia",
    Latitude: 29.8405555556,
    Longitude: 89.2966666667,
    Countries: [{
        Text: "Japan",
        Latitude: 36,
        Longitude: 138,
        Cities: [{
            Name: "Tokyo",
            Country: "Japan",
            Latitude: 35.685,
            Longitude: 139.7513889
        }, {
            Name: "Yokohama",
            Country: "Japan",
            Latitude: 35.45,
            Longitude: 139.65
        }, {
            Name: "Osaka",
            Country: "Japan",
            Latitude: 34.6666667,
            Longitude: 135.5
        }]
    }, {
        Text: "China",
        Latitude: 35,
        Longitude: 105,
        Cities: [{
            Name: "Beijing",
            Country: "China",
            Latitude: 39.92889,
            Longitude: 116.38833
        }, {
            Name: "Shanghai",
            Country: "China",
            Latitude: 31.005,
            Longitude: 121.4086111
        }]
    }]
}];