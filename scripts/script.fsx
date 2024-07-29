open System
open System.IO
open System.Text
open System.Collections.Generic

Console.Clear()

let getCars mpgFile = File.ReadAllLines mpgFile

type Car =
    { Model: string
      Make: string
      Year: int32
      MaxMpg: string
      AvgMpg: float
      MinMpg: string }

module Car =
    let fromString (s: string) =
        let elements: string [] = s.Split "\t"
        let avg = elements |> Array.skip 3 |> Array.averageBy float
        let make = elements[0]
        let model = elements[1]
        let year = Int32.Parse elements[2]
        let min = elements |> Array.skip 3 |> Array.min
        let max = elements |> Array.skip 3 |> Array.max

        { Make = make
          Model = model
          Year = year
          AvgMpg = avg
          MinMpg = min
          MaxMpg = max }

    let printSummary (car: Car) =
        printfn
            "%s %s %i, average %f, min MPG: %s, max MPG: %s"
            car.Make
            car.Model
            car.Year
            car.AvgMpg
            car.MinMpg
            car.MaxMpg

let cwd = Directory.GetCurrentDirectory()

let mpgFile = $"{cwd}\\mpg.txt"

if File.Exists mpgFile then
    mpgFile
    |> getCars
    |> Array.skip 1
    |> Array.map Car.fromString
    |> Array.sortByDescending _.AvgMpg
    |> Array.iter Car.printSummary

// Linked List

let words : string array =[| "The"; "child"; "is"; "watching"; "too"; "much"; "TV" |]

let linkedList sentence = new LinkedList<string>(words)