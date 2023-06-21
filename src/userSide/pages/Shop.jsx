import React, { useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import "../styles/shop.css";
import { useEffect } from "react";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { getAllProductUserService } from "../../services/productService";
import { getAllCategoryServices } from "../../services/categoryServices";
import { useRef } from "react";

const Shop = () => {
  const [pagination, setPagination] = useState();
  const [productsData, setProductsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState();
  
  useEffect(() => {
    const getAllCategoriesApi = () => {
      getAllCategoryServices().then((data) => {
        setCategories(data.data);
      });
    };
    getAllCategoriesApi();
  }, []);
  console.log(categories);

  useEffect(() => {
    const getAllProductsApi = () => {
      getAllProductUserService(currentPage, filterValue, searchValue, sortValue)
        .then((data) => {
          console.log(data);
          setProductsData(data.content);
          let { content, ...pageable } = data;
          setPagination({ ...pageable });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getAllProductsApi();
  }, [currentPage, filterValue, searchValue, sortValue]);
  console.log(pagination);

  const handleFilter = (e) => {
    const currentFilterValue = e.target.value;
    setFilterValue(currentFilterValue);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    setSortValue(sortValue);
    setCurrentPage(1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value="">Filter By Category</option>
                  {categories?.length > 0 &&
                    categories.map((category) => {
                      return (
                        <option value={category.categoryName}>
                          {category.categoryName}
                        </option>
                      );
                    })}
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select value={sortValue} onChange={handleSort}>
                  <option value="">Sort By</option>
                  <option value="asc">Ascending Price</option>
                  <option value="desc">Descending Price</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box" onChange={handleSearch}>
                <input type="text" placeholder="Search ...." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {!productsData ? (
              <h1 className="text-center fs-4">No products are found !</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
          {pagination && (
            <div className="custom__pagination">
              <PaginationControl
                page={currentPage}
                between={3}
                total={pagination.totalElements}
                limit={pagination.size}
                changePage={(page) => {
                  setCurrentPage(page);
                }}
                ellipsis={1}
              />
            </div>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
