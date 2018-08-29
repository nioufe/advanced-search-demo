query = query:keyValue+ {
    return query
} / !. {
    return []
}

keyValue = keyOneValue / keyManyValues

keyOneValue = key:word ":" value:word " "?{
    return {
        key: key,
        values: [value]
    }
}

keyManyValues =  key:word ":" "(" values:word+ ")" " "? {
   return {
    	key: key,
        values: values
     }
}

word = letters:[A-Z-a-z\-\_]+ " "? {
	return letters.join('')
}
