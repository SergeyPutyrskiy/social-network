import React, { useState } from "react";

import axios from "../api/config";

const withSearch = (mapper, url) => WrappedComponent => props => {
  const [value, setValue] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearchChange(e, { value }) {
    setLoading(true);

    const { data } = await axios({
      url,
      params: {
        q: value
      }
    });

    setResults(mapper(data.data));
    setLoading(false);
  }

  function handleResultSelect(e, { result }) {
    setValue(result.title);
  }

  return (
    <WrappedComponent
      searchValue={value}
      searchResults={results}
      searchLoading={loading}
      handleSearchChange={handleSearchChange}
      handleResultSelect={handleResultSelect}
      {...props}
    />
  );
};

export default withSearch;
