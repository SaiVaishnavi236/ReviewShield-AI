import pandas as pd

def generate_csv(data,path):

    df=pd.DataFrame(data)

    df.to_csv(path,index=False)

    return path