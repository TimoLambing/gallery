import IndexPage from "./index.vue";
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { getImages } from "@/composables";
import ImageItem from "@/components/image-item.vue";

describe("IndexPage", () => {
    it("should render with all images", () => {
        const wrapper = mount(IndexPage, {
            global: {
                stubs: {
                    ImageItem: true,
                },
            },
        });

        const imageItems = wrapper.findAllComponents(ImageItem);

        expect(imageItems.length).toEqual(getImages().length);
    });
});
