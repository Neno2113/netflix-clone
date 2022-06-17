import { useEffect, useState } from "react";
import axios from 'axios';
import { MovieResponse, Movies } from "../interface/Movie";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import MovieSlide from "./MovieSlide";


interface Props {
    rowID: string;
    title: string;
    fetchUrl: string; 
}

export const Row = ({ title, fetchUrl, rowID }: Props) => {

    const [movies, setMovies] = useState<Movies[]>([]);

    useEffect(() => {
        axios.get<MovieResponse>(fetchUrl).then( (resp) => {
            setMovies( resp.data.results )
        })
    }, [fetchUrl])

    const slideLeft = () => {
        let slider = document.getElementById('slider'+ rowID);
        slider!.scrollLeft = slider?.scrollLeft! - 500;
    };

    const slideRight = () => {
        let slider = document.getElementById('slider'+ rowID);
        slider!.scrollLeft = slider?.scrollLeft! + 500;
    }

    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
            <div className="relative flex items-center group"> 
                <MdChevronLeft 
                    onClick={ slideLeft }
                    className="bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" 
                    size={40}
                />
                <div id={'slider'+ rowID} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                    { movies.map(( item, index) => (
                        <MovieSlide movie={ item }   key={ index }/>
                    ))}
                </div>
                <MdChevronRight 
                    onClick={ slideRight }
                    className="bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" 
                    size={40}
                />
            </div>
        </>
    )
}
