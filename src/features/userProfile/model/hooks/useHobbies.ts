import { useDebounce } from "@/shared/lib";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllHobbies } from "../../api/getAllHobbies";
import { getHobbiesByCategory } from "../../api/getHobbiesByCategory";
import { CategoriesWithHobbies, Hobby } from "../types";
import { postUserInterests } from "../../api/postUserInterests";
import { PostUserInterestsRequest } from "../../api/types";


const useHobbies = (setVisible: (visible: boolean) => void, onNextStep: () => void) => {
    const [search, setSearch] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);

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

    const submitInterestsMutation = useMutation({
        mutationFn: (request: PostUserInterestsRequest) => postUserInterests(request),
        onSuccess: () => {
            onNextStep();
        },
        onError: (error) => {
            console.error('Error submitting interests:', error);
        }
    });

    const submitInterests = () => {
        const request: PostUserInterestsRequest = {
            interestIds: Array.from(selectedHobbies)
        };

        if (selectedCustomHobbies.size > 0) {
            const customHobbies = Array.from(selectedCustomHobbies);
            request.customInterests = customHobbies;
        }

        submitInterestsMutation.mutate(request);
    }

    const hobbiesQuery = useQuery({
        queryKey: ["hobbies", debouncedSearch],
        queryFn: async () => {
            if (debouncedSearch) {
                const result = await getAllHobbies(debouncedSearch);
                return normalizeHobbies(result.data);
            } else {
                const result = await getHobbiesByCategory();
                return result.data;
            }
        },
        enabled: true,
    });


    return {
        search,
        selectedHobbies,
        selectedCustomHobbies,
        customHobbyInput,
        customHobbyToDisplay,
        hobbies: hobbiesQuery.data || [],  
        isSubmitting: submitInterestsMutation.isPending,
        submitError: submitInterestsMutation.error,
        isLoading: hobbiesQuery.isLoading,
        isError: hobbiesQuery.isError,
        error: hobbiesQuery.error,
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