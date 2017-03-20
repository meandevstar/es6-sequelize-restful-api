const metaFields = ['managerId', 'type'];

const plainTransform = (ret) => {

    ret = JSON.parse(JSON.stringify(ret));
    metaFields.forEach((k, v) => {
        if (ret['metadata'][k] !== undefined) ret[k] = ret['metadata'][k] ;
    });

    delete ret.metadata;
    return ret;
}

export {plainTransform};