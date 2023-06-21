import React from "react";
import { SidePanel } from "../Components/SidePanel";
import { BookCard } from "../Components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BookList } from "../Redux/action";
import { Heading } from "@chakra-ui/react";

export const BookListing = () => {
  const { booklist, isLoading } = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log(booklist);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "https://api.itbook.store/1.0/search/mongodb",
    })
      .then((res) => {
        console.log(res.data.books);
        dispatch(BookList(res.data.books));
      })
      .catch((err) => console.log(err));
  },[]);
  return (
    <div>
      {/* <SidePanel/> */}
      {isLoading ? (
        <Heading>Loading...</Heading>
      ) : (
        booklist?.map((book, index) => <BookCard key={index} />)
      )}
    </div>
  );
};