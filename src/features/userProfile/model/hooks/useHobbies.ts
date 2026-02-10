import { useDebounce } from "@/shared/lib";
import { useState, useEffect } from "react";
import { getAllHobbies } from "../../api/getAllHobbies";
import { getHobbiesByCategory } from "../../api/getHobbiesByCategory";
import { CategoriesWithHobbies, Hobby } from "../types";
import { postUserInterests } from "../../api/postUserInterests";
import { PostUserInterestsRequest } from "../../api/types";


const useHobbies = (setVisible: (visible: boolean) => void, onNextStep: () => void) => {
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);

    const [hobbiesAndCategories, setHobbiesAndCategories] = useState<CategoriesWithHobbies[]>([]);

    const [selectedHobbies, setSelectedHobbies] = useState<Set<number>>(new Set());
    const [selectedCustomHobbies, setSelectedCustomHobbies] = useState<Set<number>>(new Set());
    const [customHobbyToDisplay, setCustomHobbyToDisplay] = useState<Hobby[]>([]);
    const [customHobbyInput, setCustomHobbyInput] = useState<string>("");
    const [nextCustomId, setNextCustomId] = useState<number>(1);

    const addCustomHobby = () => {
        if (!customHobbyInput.trim()) {
            return;
        }
        const hobby = generateHobby();
        setCustomHobbyToDisplay((prev) => [...prev, hobby]);
        setCustomHobbyInput("");
        setVisible(false);
    }

    const selectCustomHobby = (hobby: Hobby) => {
        setSelectedCustomHobbies((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(hobby.id)) {
                newSet.delete(hobby.id);
            } else {
                newSet.add(hobby.id);
            }
            return newSet;
        });
    }

    const generateHobby = (): Hobby => {
        const currentId = nextCustomId;
        setNextCustomId((prev: number) => prev + 1);
        
        return {
            id: currentId,
            name: customHobbyInput,
            category: "Свои интересы",
            isCustom: true,
        }
    }

    const normalizeHobbies = (hobbies: Hobby[]): CategoriesWithHobbies[] => {
        const map: Record<string, Hobby[]> = {};
        const normalizedHobbies: CategoriesWithHobbies[] = [];
        
        if (hobbies.length === 0) {
            return [];
        }

        hobbies.forEach((item) => {
            if (map[item.category]) {
                map[item.category].push(item);
            } else {
                map[item.category] = [item];
            }
        })

        for (const key in map) {
            normalizedHobbies.push({
                category: key,
                interests: map[key],
            })
        }

        return normalizedHobbies;
    }

    const submitInterests = async () => {
        try {
            const request: PostUserInterestsRequest = {
                interestIds: Array.from(selectedHobbies)
            };
            
            await postUserInterests(request);
            onNextStep();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                if (debouncedSearch) {
                    const result = await getAllHobbies(debouncedSearch, controller.signal);
                    
                    const normalizedHobbies = normalizeHobbies(result.data);
                    setHobbiesAndCategories(normalizedHobbies);
                } else {
                    const result = await getHobbiesByCategory(controller.signal);
                    setHobbiesAndCategories(result.data);
                }
            } catch (error) {
                console.error('Error fetching hobbies:', error);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [debouncedSearch]);


    return {
        hobbiesAndCategories,
        search,
        selectedHobbies,
        selectedCustomHobbies,
        customHobbyInput,
        customHobbyToDisplay,
        addCustomHobby,
        selectCustomHobby,
        setSearch,
        setSelectedHobbies,
        setSelectedCustomHobbies,
        setCustomHobbyInput,
        submitInterests,
    }
}

export default useHobbies;