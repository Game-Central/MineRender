import { Model } from "./model/Model";
import { Models } from "./Models";
import merge from "ts-deepmerge";

export class ModelMerger {

    public static async mergeWithParents(model: Model): Promise<Model> {
        const models = await this.collectAllParents(model);
        const names: string[] = models.map(m => m.name).filter(s => !!s) as string[];
        let merged: Model = {};
        for (let parentModel of models) {
            merged = merge(merged, parentModel);
        }
        merged = merge(merged, model);
        merged.names = names;
        delete merged.parent;
        return merged;
    }

    protected static async collectAllParents(model: Model): Promise<Model[]> {
        if (!model.parent) {
            return [];
        }
        const models: Model[] = [];
        const parentKey = Models.parseModelKey(model.parent);
        const parentModel = await Models.getRaw(parentKey);
        console.log(parentModel)
        if (parentModel) {
            models.unshift(parentModel);
            models.unshift(...await this.collectAllParents(parentModel));
        }
        return models;
    }

}
