import { useDebounce } from "@/shared/lib";
import { useState, useEffect } from "react";
import getAllHobbies from "../../api/getAllHobbies";
import getHobbiesByCategory from "../../api/getHobbiesByCategory";
import { CategoriesWithHobbies, Hobby } from "../types";

const useHobbies = (setVisible: (visible: boolean) => void) => {
    const [search, setSearch] = useState<string>("");
    const [searchedHobbies, setSearchedHobbies] = useState<Hobby[]>([]);
    const debouncedSearch = useDebounce(search, 500);

    const [loading, setLoading] = useState<boolean>(false);
    const [hobbiesAndCategories, setHobbiesAndCategories] = useState<CategoriesWithHobbies[]>([]);
    const [selectedHobbies, setSelectedHobbies] = useState<Hobby[]>([]);

    const [customHobby, setCustomHobby] = useState<string>("");
    const [customHobbies, setCustomHobbies] = useState<Hobby[]>([{
        id: 666,
        name: "Добавить свои интересы",
        category: "Свои интересы",
        isCustom: true,
    }]);

    const addCustomHobby = (hobby: Hobby) => {
        setCustomHobbies((prev) => [hobby, ...prev]);
        setCustomHobby("");
    }

    const removeCustomHobby = (hobby: Hobby) => {
        setCustomHobbies((prev) => prev.filter((item) => item !== hobby));
    }

    const handleSelectHobby = (hobby: Hobby) => {
        if (hobby.id === 666) {
            setVisible(true);
            return;
        }

        if (hobby.isCustom) {
            removeCustomHobby(hobby);
            return;
        }

        setSelectedHobbies((prev) => (prev.includes(hobby) ? prev.filter((item) => item !== hobby) : [...prev, hobby]));
    }

    const searchHobbies = async () => {
        try {
            setLoading(true);

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
        loading,
        hobbiesAndCategories,
        searchedHobbies,
        search,
        selectedHobbies,
        customHobbies,
        customHobby,
        setSearch,
        handleSelectHobby,
        addCustomHobby,
        setCustomHobby,
    }
}

export default useHobbies;