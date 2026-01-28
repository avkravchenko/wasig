import { useDebounce } from "@/shared/lib";
import { useState, useEffect } from "react";
import getAllHobbies from "../../api/getAllHobbies";
import getHobbiesByCategory from "../../api/getHobbiesByCategory";
import { CategoriesWithHobbies, Hobby } from "../types";

const useHobbies = () => {
    const [search, setSearch] = useState<string>("");
    const [searchedHobbies, setSearchedHobbies] = useState<Hobby[]>([]);
    const debouncedSearch = useDebounce(search, 500);

    const [hobbiesAndCategories, setHobbiesAndCategories] = useState<CategoriesWithHobbies[]>([]);

    const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);


    const [loading, setLoading] = useState<boolean>(false);

    const handleSelectHobby = (hobby: string) => {
        setSelectedHobbies((prev) => (prev.includes(hobby) ? prev.filter((item) => item !== hobby) : [...prev, hobby]));
    }

    const searchHobbies = async () => {
        setLoading(true);
        try {
            const result = await getAllHobbies(debouncedSearch);
            setLoading(false);
            
            if (result.status === 200) {
            setSearchedHobbies(result.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const getHobbiesAndCategories = async () => {
        const result = await getHobbiesByCategory();
        
        if (result.status === 200) {
            setHobbiesAndCategories(result.data);
        }
    }

    useEffect(() => {
        if (search) {
            searchHobbies();
        }
    }, [debouncedSearch]);

    useEffect(() => {
        getHobbiesAndCategories();
    }, [])

    return {
        hobbiesAndCategories,
        searchedHobbies,
        search,
        selectedHobbies,
        setSearch,
        handleSelectHobby,
    }
}

export default useHobbies;