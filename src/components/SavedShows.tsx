import { useContext, useEffect, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { AuthContext } from '../context/authContext';
import { db } from '../firebase-config';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { Movies } from '../interface/Movie';
import { AiOutlineClose } from 'react-icons/ai';

interface SavedShowsProps {
    id?: string;
    title?: string;
    img?: string;

}

const SavedShows = () => {
    const [movies, setMovies] = useState<SavedShowsProps[]>([])
    const { user } = useContext( AuthContext );

    useEffect(() => {
        onSnapshot( doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies( doc.data()?.savedShows )
        })
    }, [user?.email])
    
    const slideLeft = () => {
        let slider = document.getElementById('slider');
        slider!.scrollLeft = slider?.scrollLeft! - 500;
    };

    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider!.scrollLeft = slider?.scrollLeft! + 500;
    }

    const movieRef = doc( db, 'users', `${user?.email}`);

    const deleteShow = async( passedId: string ) => {
        try {
            const result = movies.filter( (item) => item.id !== passedId);
            await updateDoc( movieRef, {
                savedShows: result
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <div>
            <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
            <div className="relative flex items-center group"> 
                <MdChevronLeft 
                    onClick={ slideLeft }
                    className="bg-white rounded-full absolute left-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" 
                    size={40}
                />
                <div id={'slider'} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
                    { movies.map(( item, index) => (
                        <div key={index} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
                           <img
                               className="w-full h-auto block" 
                               src={`https://image.tmdb.org/t/p/w500/${item?.img}`}  
                               alt={ item?.title} 
                           />
                           <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                                <p className="white-space-normal text-sx md:text-sm font-bold flex justify-center items-center h-full text-center">{item?.title}</p>
                                <p 
                                    onClick={ () => deleteShow(item.id!)}                                    
                                    className='absolute text-gray-300 top-4 right-4'
                                >
                                    <AiOutlineClose />
                                </p>
                           </div>
                        </div>
                    ))}
                </div>
                <MdChevronRight 
                    onClick={ slideRight }
                    className="bg-white rounded-full absolute right-0 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block" 
                    size={40}
                />
            </div>
        </div>
    )
}

export default SavedShows