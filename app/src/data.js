
data = {
	/*
'spain_constituencies': {
	'a coruna': 8, 'pontevedra': 7, 'lugo': 4, 'ourense': 4, 'asturias': 7, 'leon': 4,'zamora': 3, 'salamanca': 4, 'caceres': 4, 'badajoz': 6, 'huelva': 5, 'seville': , 'cadiz': , 'cordoba': , 'malaga': , 'granada': , 'almeria': , 'jaen': , 'murcia': , 'alicante': , 'albacete': , 'ciudad real': , 'toledo': , 'cuenca': , 'valencia': , 'castellon': , 'teruel': , 'guadalajara': , 'madrid': , 'avila': , 'segovia': , 'valladolid': , 'palencia': , 'burgos': , 'soria': , 'zaragoza': , 'tarragona': , 'barcelona': , 'girona': , 'lleida': , 'huesca': , 'navarre': , 'la rioja': , 'alava': , 'gipuzkoa': , 'biscay': , 'canabria': }, */

'usa_voting_pop': {'AL': 3766477, 'AK': 554567, 'AZ': 5299579, 'AR': 2283195, 'CA': 30157154, 'CO': 4279173, 'CT': 2823158, 'DE': 747791, 'FL': 16465727, 'GA': 7798827, 'HI': 1120541, 'ID': 1245967, 'IL': 9875430, 'IN': 5057601, 'IA': 2403962, 'KS': 2192338, 'KY': 3426345, 'LA': 3567717, 'ME': 1081705, 'ME-AL': 1081705, 'ME-D1': 555860, 'ME-D2': 525845, 'MD': 4667719, 'MA': 5433677, 'MI': 7737243, 'MN': 4231619, 'MS': 2267438, 'MO': 4706137, 'MT': 814909, 'NE': 1445479, 'NE-AL': 1445479, 'NE-D1': 493216, 'NE-D2': 493516, 'NE-D3': 458747, 'NV': 2262631, 'NH': 1074207, 'NJ': 6969717, 'NM': 1590352, 'NY': 15564730, 'NC': 7848068, 'ND': 581641, 'OH': 9002201, 'OK': 2961933, 'OR': 3224738, 'PA': 10109422, 'RI': 848045, 'SC': 3863498, 'SD': 652167, 'TN': 5149399, 'TX': 20568009, 'UT': 2129444, 'VT': 506066, 'VA': 6541685, 'WA': 5658502, 'WV': 1456034, 'WI': 4491015, 'WY': 446600, 'DC': 560277},

'usa_ec': {'AL': 9, 'AK': 3, 'AZ': 11, 'AR': 6, 'CA': 55, 'CO': 9, 'CT': 7, 'DE': 3, 'FL': 29, 'GA': 16, 'HI': 4, 'ID': 4, 'IL': 20, 'IN': 11, 'IA': 6, 'KS': 6, 'KY': 8, 'LA': 8, 'ME': 4, 'ME-AL': 2, 'ME-D1': 1, 'ME-D2': 1, 'MD': 10, 'MA': 11, 'MI': 16, 'MN': 10, 'MS': 6, 'MO': 10, 'MT': 3, 'NE': 5, 'NE-AL': 2, 'NE-D1': 1, 'NE-D2': 1, 'NE-D3': 1, 'NV': 6, 'NH': 4, 'NJ': 14, 'NM': 5, 'NY': 29, 'NC': 15, 'ND': 3, 'OH': 18, 'OK': 7, 'OR': 7, 'PA': 20, 'RI': 4, 'SC': 9, 'SD': 3, 'TN': 11, 'TX': 38, 'UT': 6, 'VT': 3, 'VA': 13, 'WA': 12, 'WV': 5, 'WI': 10, 'WY': 3, 'DC': 3},

'usa_1972_ec': {'AL': 9, 'AK': 3, 'AZ': 6, 'AR': 6, 'CA': 45, 'CO': 7, 'CT': 8, 'DE': 3, 'FL': 17, 'GA': 12, 'HI': 4, 'ID': 4, 'IL': 26, 'IN': 13, 'IA': 8, 'KS': 7, 'KY': 9, 'LA': 10, 'ME': 4, 'ME-AL': 2, 'ME-D1': 1, 'ME-D2': 1, 'MD': 10, 'MA': 14, 'MI': 21, 'MN': 10, 'MS': 7, 'MO': 12, 'MT': 4, 'NE': 5, 'NV': 3, 'NH': 4, 'NJ': 17, 'NM': 4, 'NY': 41, 'NC': 13, 'ND': 3, 'OH': 25, 'OK': 8, 'OR': 6, 'PA': 27, 'RI': 4, 'SC': 8, 'SD': 4, 'TN': 10, 'TX': 26, 'UT': 4, 'VT': 3, 'VA': 11, 'WA': 9, 'WV': 6, 'WI': 11, 'WY': 3, 'DC': 3},

'usa_no_districts_ec': {'AL': 9, 'AK': 3, 'AZ': 11, 'AR': 6, 'CA': 55, 'CO': 9, 'CT': 7, 'DE': 3, 'FL': 29, 'GA': 16, 'HI': 4, 'ID': 4, 'IL': 20, 'IN': 11, 'IA': 6, 'KS': 6, 'KY': 8, 'LA': 8, 'ME': 4,'MD': 10, 'MA': 11, 'MI': 16, 'MN': 10, 'MS': 6, 'MO': 10, 'MT': 3, 'NE': 5, 'NV': 6, 'NH': 4, 'NJ': 14, 'NM': 5, 'NY': 29, 'NC': 15, 'ND': 3, 'OH': 18, 'OK': 7, 'OR': 7, 'PA': 20, 'RI': 4, 'SC': 9, 'SD': 3, 'TN': 11, 'TX': 38, 'UT': 6, 'VT': 3, 'VA': 13, 'WA': 12, 'WV': 5, 'WI': 10, 'WY': 3, 'DC': 3},

'usa_senate': {'AL': 1, 'AL-S': 1, 'AK': 1, 'AK-S': 1, 'AZ': 1, 'AZ-S': 1, 'AR': 1, 'AR-S': 1, 'CA': 1, 'CA-S': 1, 'CO': 1, 'CO-S': 1, 'CT': 1, 'CT-S': 1, 'DE': 1, 'DE-S': 1, 'FL': 1, 'FL-S': 1, 'GA': 1, 'GA-S': 1, 'HI': 1, 'HI-S': 1, 'ID': 1, 'ID-S': 1, 'IL': 1, 'IL-S': 1, 'IN': 1, 'IN-S': 1, 'IA': 1, 'IA-S': 1, 'KS': 1, 'KS-S': 1, 'KY': 1, 'KY-S': 1, 'LA': 1, 'LA-S': 1, 'ME': 1, 'ME-S': 1, 'MD': 1, 'MD-S': 1, 'MA': 1, 'MA-S': 1, 'MI': 1, 'MI-S': 1, 'MN': 1, 'MN-S': 1, 'MS': 1, 'MS-S': 1, 'MO': 1, 'MO-S': 1, 'MT': 1, 'MT-S': 1, 'NE': 1, 'NE-S': 1, 'NV': 1, 'NV-S': 1, 'NH': 1, 'NH-S': 1, 'NJ': 1, 'NJ-S': 1, 'NM': 1, 'NM-S': 1, 'NY': 1, 'NY-S': 1, 'NC': 1, 'NC-S': 1, 'ND': 1, 'ND-S': 1, 'OH': 1, 'OH-S': 1, 'OK': 1, 'OK-S': 1, 'OR': 1, 'OR-S': 1, 'PA': 1, 'PA-S': 1, 'RI': 1, 'RI-S': 1, 'SC': 1,'SC-S': 1, 'SD': 1, 'SD-S': 1, 'TN': 1, 'TN-S': 1, 'TX': 1, 'TX-S': 1, 'UT': 1, 'UT-S': 1, 'VT': 1, 'VT-S': 1, 'VA': 1, 'VA-S': 1, 'WA': 1, 'WA-S': 1, 'WV': 1, 'WV-S': 1, 'WI': 1, 'WI-S': 1, 'WY': 1, 'WY-S': 1},

'usa_gubernatorial': {'AL': 1, 'AK': 1, 'AZ': 1, 'AR': 1, 'CA': 1, 'CO': 1, 'CT': 1, 'DE': 1, 'FL': 1, 'GA': 1, 'HI': 1, 'ID': 1, 'IL': 1, 'IN': 1, 'IA': 1, 'KS': 1, 'KY': 1, 'LA': 1, 'ME': 1,'MD': 1, 'MA': 1, 'MI': 1, 'MN': 1, 'MS': 1, 'MO': 1, 'MT': 1, 'NE': 1, 'NV': 1, 'NH': 1, 'NJ': 1, 'NM': 1, 'NY': 1, 'NC': 1, 'ND': 1, 'OH': 1, 'OK': 1, 'OR': 1, 'PA': 1, 'RI': 1, 'SC': 1, 'SD': 1, 'TN': 1, 'TX': 1, 'UT': 1, 'VT': 1, 'VA': 1, 'WA': 1, 'WV': 1, 'WI': 1, 'WY': 1},

'canada_ec': {'NL': 1, 'QC': 1, 'NB': 1, 'NS': 1, 'ON': 1, 'MB': 1, 'SK': 1, 'AB': 1, 'BC': 1, 'YT': 1, 'NT': 1, 'NU': 1, 'PE': 1},

'lte_ec': {'NE': 11, 'SE': 9, 'MW': 8, 'WE': 6, 'SW': 5, 'OV': 7},

'dem_primary': {'AL': 52, 'AK': 14, 'AS': 6, 'AZ': 67, 'AR': 31, 'CA': 416, 'CO': 67, 'CT': 49, 'DE': 17, 'DA': 13, 'DC': 17, 'FL': 219, 'GA': 105, 'GU': 6, 'HI': 22, 'ID': 20, 'IL': 155, 'IN': 70, 'IA': 41, 'KS': 33, 'KY': 46, 'LA': 50, 'ME': 24, 'MD': 79, 'MA': 91, 'MI': 125, 'MN': 75, 'MS': 36, 'MO': 68, 'MT': 16, 'NE': 25, 'NV': 36, 'NH': 24, 'NJ': 107, 'NM': 29, 'NY': 224, 'NC': 110, 'ND': 14, 'NI': 6, 'OH': 136, 'OK': 37, 'OR': 52, 'PA': 153, 'PR': 51, 'RI': 21, 'SC': 54, 'SD': 14, 'SU': 764, 'TN': 64, 'TX': 228, 'UT': 29, 'VT': 16, 'VI': 6, 'VA': 99, 'WA': 89, 'WV': 24, 'WI': 77, 'WY': 13},

'rep_primary': {'AL': 50, 'AK': 28, 'AS': 9, 'AZ': 57, 'AR': 40, 'CA': 172, 'CO': 37, 'CT': 28, 'DE': 16, 'DC': 19, 'FL': 122, 'GA': 76, 'GU': 9, 'HI': 19, 'ID': 32, 'IL': 67, 'IN': 70, 'IA': 40, 'KS': 39, 'KY': 46, 'LA': 46, 'ME': 22, 'MD': 38, 'MA': 41, 'MI': 73, 'MN': 39, 'MS': 39, 'MO': 54, 'MT': 27, 'NE': 36, 'NV': 25, 'NH': 22, 'NJ': 49, 'NM': 22, 'NY': 95, 'NC': 71, 'ND': 29, 'NI': 9, 'OH': 82, 'OK': 43, 'OR': 28, 'PA': 88, 'PR': 23, 'RI': 19, 'SC': 50, 'SD': 29, 'TN': 58, 'TX': 155, 'UT': 40, 'VT': 17, 'VI': 9, 'VA': 49, 'WA': 44, 'WV': 34, 'WI': 52, 'WY': 29},

'eu_parliament': {'IE-S':5,'IE-N':4,'IE-D':4,'BE-D':12,'BE-F':8,'BE-G':1,'FR':79,'ES':59,'PT':21,'IT':76,'MT':6,'CY':6,'GR':21,'BG':17,'RO':33,'HR':12,'HU':21,'SL':8,'AT':19,'SK':14,'CZ':21,'PO':52,'LI':11,'LV':8,'EE':7,'FI':14,'SE':21,'DK':14,'NL':29,'LU':6,'DE':96}

}

console.log(data['spain_constituencies']);

