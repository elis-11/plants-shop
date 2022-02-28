/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import * as qsys from "./qtools/qsys";
import { useMediaQuery } from "react-responsive";
import Stars from "./Stars";
import Footer from "../layout/Footer";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

import SingleItem from "./SingleItem";
import styles from "./addproducts.module.css";

const AddProduct = () => {
  const [searchText, setSearchText] = useState("");
  const [starRatings, setStarRatings] = useState([]);
  const [initialPlants, setInitialPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [filteredPlant, setFilteredPlant] = useState({});
  const inputSearchText = useRef(null);
  const isSmartphone = useMediaQuery({
    query: "(max-width: 577px)",
  });

  const updateUrlBase = () => {
    qsys.changeBrowserState(document, "plants", "", "", `All Plants`);
  };
  const decoratePlants = (_plants, _ratings) => {
    _plants.forEach((_plant) => {
      _plant.starRatings = _ratings.filter((el) => {
        return el.plantId === _plant._id;
      });
    });
    _plants.forEach((_plant) => {
      const sum = _plant.starRatings.reduce((acc, obj) => acc + obj.star, 0);
      _plant.averageRating =
        _plant.starRatings.length === 0
          ? null
          : sum / _plant.starRatings.length;
    });
  };

  const loadProduct = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/plants`);
    const filteredPlants = await response.json();
    filteredPlants.forEach((product) => (product.isEditingPrice = false));
    setFilteredPlants(filteredPlants);
  };

  useEffect(() => {
    let _ratings = [];
    (async () => {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/stars`,
        requestOptions
      );

      if (response.ok) {
        _ratings = await response.json();
        // console.log(_ratings)

        setStarRatings([..._ratings]);
      }

      const response2 = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/plants`,
        requestOptions
      );

      if (response2.ok) {
        const plantsJson = await response2.json();

        const _initialPlants = plantsJson.map((m) => {
          m.bulkSearchText = `${m.name}|${m.price}|${m.title}|${m.description}`;
          return m;
        });

        let _filteredPlants = [..._initialPlants];
        const urlId = qsys.getParameterValueFromUrl("_id");
        if (urlId !== "") {
          _filteredPlants = _initialPlants.filter((m) => m._id === urlId);
          updateUrlWithId(_filteredPlants[0]);
        }
        const urlSearchText = qsys.getParameterValueFromUrl("searchText");
        if (urlSearchText !== "") {
          _filteredPlants = searchAllPlant(_initialPlants, urlSearchText);
          setSearchText(urlSearchText);
          updateUrlWithSearchText(urlSearchText);
        }
        decoratePlants(_initialPlants, _ratings);
        setInitialPlants(_initialPlants);
        setFilteredPlants(_filteredPlants); // API
        if (_filteredPlants.length === 1) {
          setFilteredPlant(_filteredPlants[0]);
        }
      }
    })();

    if (!isSmartphone) {
      inputSearchText.current.focus();
    }
    loadProduct();
  }, []);

  const handleEditButton = (product) => {
    product.isEditingPrice = !product.isEditingPrice;
    setFilteredPlants([...filteredPlants]);
  };

  const handleEditCancelButton = (product) => {
    product.isEditingPrice = !product.isEditingPrice;
    loadProduct();
    setFilteredPlants([...filteredPlants]);
  };

  const handlePriceChange = (product, e) => {
    product.price = e.target.value;
    setFilteredPlants([...filteredPlants]);
  };

  const handlePriceSave = async (product) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/editproduct/${product._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: product.price }),
      }
    );
    loadProduct();
  };

  const handelDeleteButton = async (product) => {
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/deleteProduct/${product._id}`,
      {
        method: "DELETE",
      }
    );
    loadProduct();
  };

  const updateUrlWithId = (plant) => {
    qsys.changeBrowserState(
      document,
      "Plants",
      "_id",
      plant._id,
      `Plants: ${plant.name} ${plant.price}`
    );
  };

  const updateUrlWithSearchText = (searchText) => {
    if (searchText.trim() === "") {
      updateUrlBase();
    } else {
      qsys.changeBrowserState(
        document,
        "plants",
        "searchText",
        searchText,
        `Plants Search: "${searchText}"`
      );
    }
  };

  const searchAllPlant = (_Plants, searchText) => {
    const foundPlants = [];
    _Plants.forEach((plant) => {
      let plantMatched = true;
      const searchWords = searchText.split(" ");
      searchWords.forEach((searchWord) => {
        if (
          !plant.bulkSearchText.toUpperCase().includes(searchWord.toUpperCase())
        ) {
          plantMatched = false;
        }
      });
      if (plantMatched) foundPlants.push(plant);
    });
    return foundPlants;
  };

  useEffect(() => {}, []);

  const displaySearchResults = (e) => {
    const searchText = e.target.value;
    if (searchText.trim() !== "" || filteredPlants.length > 0) {
      setSearchText(e.target.value);

      const filteredPlants = searchAllPlant([...initialPlants], searchText);
      setFilteredPlants([...filteredPlants]);
      if (filteredPlants.length === 1) {
        setFilteredPlant(filteredPlants[0]);
      }
      updateUrlWithSearchText(searchText);
    }
  };

  const showSinglePlant = (plant) => {
    setFilteredPlants([plant]);
    // setFilteredPlant(plant);
    updateUrlWithId(plant);
  };

  const showAllPlants = () => {
    setInitialPlants(initialPlants);
    setFilteredPlants(initialPlants);
    if (initialPlants.length === 1) {
      setFilteredPlant(initialPlants[0]);
    }
    setSearchText("");
    updateUrlBase();
    setTimeout(() => {
      if (!isSmartphone) {
        inputSearchText.current.focus();
      }
    }, 100);
  };

  return (
    <div className={styles.pagePlants}>
      <div className={styles.totalHeader}>
        {filteredPlants.length > 1 &&
          filteredPlants.length < initialPlants.length && (
            <div>
              <button onClick={showAllPlants}>back</button>
              <div className={styles.searchArea}>
                <input
                  type="text"
                  ref={inputSearchText}
                  placeholder="SEARCH"
                  value={searchText}
                  onFocus={displaySearchResults}
                  onChange={displaySearchResults}
                  autoFocus
                />
              </div>
            </div>
          )}

        {filteredPlants.length === 1 && (
          <div>
            <button onClick={showAllPlants}>back</button>
          </div>
        )}

        {filteredPlants.length === initialPlants.length && (
          <div className={styles.searchArea}>
            <input
              type="text"
              ref={inputSearchText}
              placeholder="SEARCH"
              value={searchText}
              onFocus={displaySearchResults}
              onChange={displaySearchResults}
              autoFocus
            />
          </div>
        )}
      </div>
      <div className={styles.ergebnis}>{filteredPlants.length} Result</div>
      {/* MULTIPLE PLANTS */}
      {filteredPlants.length >= 1 && (
        <div className={styles.plantsArea}>
          {filteredPlants.map((p, i) => {
            return (
              <div className={styles.plantCard} key={i}>
                <div>
                  <div className={styles["img-container"]}>
                    <img
                      src={p.image}
                      onMouseEnter={(e) =>
                        (e.currentTarget.src = p.image_second)
                      }
                      onMouseOut={(e) => (e.currentTarget.src = p.image)}
                      alt={p.name}
                      className="photo"
                    />
                  </div>
                  <div className={styles.container}>
                    <div className={styles.name}>{p.name}</div>
                    <div className={styles.location}>{p.location} plant</div>

                    <div className="row">
                      {!p.isEditingPrice && (
                        <div className={styles.price}>{`$${p.price}`}</div>
                      )}

                      {p.isEditingPrice && (
                        <div className="data editing">
                          <input
                            type="Number"
                            onChange={(e) => handlePriceChange(p, e)}
                            value={p.price}
                          />
                          <button onClick={() => handlePriceSave(p)}>
                            Save
                          </button>
                          <button onClick={() => handleEditCancelButton(p)}>
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="iconRow">
                    <button
                      onClick={() => handelDeleteButton(p)}
                      className="icon"
                    >
                      <RiDeleteBin6Line />
                    </button>

                    <button
                      className="edit"
                      onClick={() => handleEditButton(p)}
                    >
                      <GrEdit />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AddProduct;
