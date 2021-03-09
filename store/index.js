export const state = () => ({
    cordinateList: [],
    index: 0,
})

export const mutations = {
    add(state, coords) {
        if (
            state.cordinateList[state.index] !=
            state.cordinateList[state.index - 1] ||
            state.cordinateList[state.index - 1] == undefined
        ) {
            state.cordinateList.push([
                coords
            ]);
            state.index++;
        }
        // state.cordinateList.push({
        //     coords
        // })
    },
}